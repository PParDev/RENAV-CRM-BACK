import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { LeadsService } from '../crm/leads/leads.service';
import { LeadPriority } from '../crm/leads/dto/create-lead.dto';
import { AiService } from '../ai/ai.service';
import { EventsService } from '../events/events.service';
import { WhatsappSenderService } from './whatsapp-sender.service';

@Injectable()
export class WhatsappService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly leadsService: LeadsService,
        private readonly aiService: AiService,
        private readonly eventsService: EventsService,
        private readonly sender: WhatsappSenderService,
    ) { }

    async processMessage(fromPhone: string, text: string, contactName: string) {
        // Clean phone (WhatsApp usually sends with area code e.g., 521...)
        let cleanPhone = fromPhone.replace(/\D/g, '');
        if (cleanPhone.startsWith('52') && cleanPhone.length === 12) {
             // In Mexico WA adds a '1' sometimes after 52, depending on standard. Let's just use what they send.
        }

        // 1. Find if contact exists
        let contacto = await this.prisma.crmContacto.findFirst({
            where: { telefono: { contains: cleanPhone.substring(cleanPhone.length - 10) } },
        });

        if (!contacto) {
            // Create contact
            contacto = await this.prisma.crmContacto.create({
                data: {
                    nombre: contactName,
                    telefono: cleanPhone,
                },
            });
        }

        // 2. Find active lead for this contact
        let lead = await this.prisma.crmLead.findFirst({
            where: {
                id_contacto: contacto.id_contacto,
                estado: { notIn: ['CERRADO', 'DESCARTADO', 'PERDIDO'] },
            },
        });

        if (!lead) {
            // Create new lead using LeadsService so it auto-assigns
            lead = await this.leadsService.create({
                id_contacto: contacto.id_contacto,
                estado: 'NUEVO',
                prioridad: LeadPriority.ALTA,
                notas_iniciales: 'Lead originado vía WhatsApp',
            });
            console.log(`[WhatsApp] Created new lead ${lead.id_lead} for ${cleanPhone}`);
            // Notify frontend: a new lead appeared
            this.eventsService.emit({ type: 'nuevo_lead', payload: { id_lead: lead.id_lead } });
        }

        // 3. Insert Message
        const mensaje = await this.prisma.crmMensaje.create({
            data: {
                id_lead: lead.id_lead,
                es_entrante: true,
                canal: 'WHATSAPP',
                texto: text,
            },
        });
        
        console.log(`[WhatsApp] New message from ${cleanPhone} saved to lead ${lead.id_lead}`);
        // Notify frontend: new incoming message ready
        this.eventsService.emit({
            type: 'nuevo_mensaje',
            payload: {
                id_lead: lead.id_lead,
                id_mensaje: mensaje.id_mensaje,
                texto: text,
                es_entrante: true,
                canal: 'WHATSAPP',
                creado_en: mensaje.creado_en,
            },
        });

        // AI intervention
        try {
            console.log(`[WhatsApp] Calling AiService for lead ${lead.id_lead}...`);
            const aiResult = await this.aiService.chat(lead.id_lead, text, true);
            
            if (aiResult && aiResult.respuesta) {
                // Remove internal AI markers before sending to actual user
                let answerToSend = aiResult.respuesta;
                const markerIdx = answerToSend.indexOf('<!--RENAV_PROPS:');
                if (markerIdx !== -1) {
                    answerToSend = answerToSend.slice(0, markerIdx).trimEnd();
                }

                await this.sender.sendMessage(fromPhone, answerToSend);
                console.log(`[WhatsApp] AI responded to ${cleanPhone}`);

                // Notify frontend that the AI reply was stored
                this.eventsService.emit({
                    type: 'nuevo_mensaje',
                    payload: { id_lead: lead.id_lead, es_ai: true },
                });
            }
        } catch (e) {
            console.error(`[WhatsApp] Error calling AI for lead ${lead.id_lead}:`, e);
        }
    }
}
