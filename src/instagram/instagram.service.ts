import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { LeadsService } from '../crm/leads/leads.service';
import { LeadPriority } from '../crm/leads/dto/create-lead.dto';
import { AiService } from '../ai/ai.service';
import { EventsService } from '../events/events.service';
import { InstagramSenderService } from './instagram-sender.service';

@Injectable()
export class InstagramService {
    private readonly logger = new Logger(InstagramService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly leadsService: LeadsService,
        private readonly aiService: AiService,
        private readonly eventsService: EventsService,
        private readonly sender: InstagramSenderService,
    ) { }

    async processMessage(igsid: string, text: string, username: string) {
        this.logger.log(`[Instagram] Procesando mensaje de ${username} (${igsid}): ${text}`);

        // 1. Buscar si existe el contacto por su identificador de Instagram (igsid)
        // Guardaremos el igsid en un campo del contacto o usaremos una lógica de búsqueda.
        // Como el contacto puede no tener teléfono, usaremos el igsid como identificador único.
        
        let contacto = await this.prisma.crmContacto.findFirst({
            where: { 
                OR: [
                    { instagram_id: igsid },
                    { nombre: username } // Fallback por nombre si no tenemos el ID guardado aún
                ]
            },
        });

        if (!contacto) {
            // Crear contacto nuevo
            contacto = await this.prisma.crmContacto.create({
                data: {
                    nombre: username || 'Usuario de Instagram',
                    instagram_id: igsid,
                },
            });
        } else if (!contacto.instagram_id) {
            // Actualizar contacto existente con su ID de Instagram
            await this.prisma.crmContacto.update({
                where: { id_contacto: contacto.id_contacto },
                data: { instagram_id: igsid }
            });
        }

        // 2. Buscar lead activo
        let lead = await this.prisma.crmLead.findFirst({
            where: {
                id_contacto: contacto.id_contacto,
                estado: { notIn: ['CERRADO', 'DESCARTADO', 'PERDIDO'] },
            },
        });

        if (!lead) {
            lead = await this.leadsService.create({
                id_contacto: contacto.id_contacto,
                estado: 'NUEVO',
                prioridad: LeadPriority.ALTA,
                notas_iniciales: 'Lead originado vía Instagram Direct',
            });
            this.eventsService.emit({ type: 'nuevo_lead', payload: { id_lead: lead.id_lead } });
        }

        // 3. Insertar Mensaje en la base de datos
        const mensaje = await this.prisma.crmMensaje.create({
            data: {
                id_lead: lead.id_lead,
                es_entrante: true,
                canal: 'INSTAGRAM',
                texto: text,
            },
        });

        // Auto-transition NUEVO -> EN PROCESO
        if (lead.estado === 'NUEVO') {
            await this.prisma.crmLead.update({
                where: { id_lead: lead.id_lead },
                data: { estado: 'EN PROCESO' },
            });
            this.eventsService.emit({ type: 'lead_actualizado', payload: { id_lead: lead.id_lead, estado: 'EN PROCESO' } });
        }

        // Notificar al frontend
        this.eventsService.emit({
            type: 'nuevo_mensaje',
            payload: {
                id_lead: lead.id_lead,
                id_mensaje: mensaje.id_mensaje,
                texto: text,
                es_entrante: true,
                canal: 'INSTAGRAM',
                creado_en: mensaje.creado_en,
            },
        });

        // 4. Intervención de IA (Maya)
        try {
            if (lead.ia_activa) {
                const aiResult = await this.aiService.chat(lead.id_lead, text, true);
                
                if (aiResult && aiResult.respuesta) {
                    let answerToSend = aiResult.respuesta;
                    // Limpiar marcadores internos si existen
                    const markerIdx = answerToSend.indexOf('<!--RENAV_PROPS:');
                    if (markerIdx !== -1) {
                        answerToSend = answerToSend.slice(0, markerIdx).trimEnd();
                    }

                    if (aiResult.mediaUrl) {
                        await this.sender.sendImage(igsid, aiResult.mediaUrl);
                        // También enviamos el texto por separado o junto si el API lo permite
                        if (answerToSend) await this.sender.sendMessage(igsid, answerToSend);
                    } else {
                        await this.sender.sendMessage(igsid, answerToSend);
                    }
                }
            }
        } catch (e) {
            this.logger.error(`[Instagram] Error IA: ${e.message}`);
        }
    }
}
