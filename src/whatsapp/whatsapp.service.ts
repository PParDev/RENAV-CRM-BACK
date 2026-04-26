import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { LeadsService } from '../crm/leads/leads.service';
import { LeadPriority } from '../crm/leads/dto/create-lead.dto';
import { AiService } from '../ai/ai.service';
import { EventsService } from '../events/events.service';
import { WhatsappSenderService } from './whatsapp-sender.service';
import { ConfigService } from '@nestjs/config';
import { UploadService } from '../upload/upload.service';
import { Readable } from 'stream';

@Injectable()
export class WhatsappService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly leadsService: LeadsService,
        private readonly aiService: AiService,
        private readonly eventsService: EventsService,
        private readonly sender: WhatsappSenderService,
        private readonly configService: ConfigService,
        private readonly uploadService: UploadService,
    ) { }

    private async downloadMediaFromMeta(mediaId: string): Promise<string | null> {
        try {
            const token = this.configService.get<string>('WHATSAPP_TOKEN');
            if (!token) return null;

            // 1. Obtener la URL interna usando el Media ID
            const res = await fetch(`https://graph.facebook.com/v18.0/${mediaId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (!data.url) return null;

            // 2. Descargar el archivo binario desde la URL interna
            const bufferRes = await fetch(data.url, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!bufferRes.ok) return null;
            
            const arrayBuffer = await bufferRes.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            
            // 3. Crear un objeto tipo Express.Multer.File falso para pasarlo al uploadService
            const file: any = {
                fieldname: 'file',
                originalname: `wapp_media_${mediaId}`,
                encoding: '7bit',
                mimetype: bufferRes.headers.get('content-type') || 'application/octet-stream',
                buffer,
                size: buffer.length
            };

            // 4. Utilizar nuestro servicio de subida (que guarda en memoria, S3, o localmente)
            const uploadedUrl = await this.uploadService.uploadFile(file, 'inbox-media');
            return uploadedUrl;
        } catch (e) {
            console.error(`[WhatsApp] Download Media Error:`, e);
            return null;
        }
    }

    async processMessage(fromPhone: string, text: string, contactName: string, mediaId?: string) {
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

        // 3. Download media if attached
        let finalMediaUrl: string | undefined = undefined;
        if (mediaId && mediaId !== 'null' && mediaId !== undefined) {
            const _media = await this.downloadMediaFromMeta(mediaId);
            finalMediaUrl = _media ? _media : undefined;
        }

        // 4. Insert Message
        const mensaje = await this.prisma.crmMensaje.create({
            data: {
                id_lead: lead.id_lead,
                es_entrante: true,
                canal: 'WHATSAPP',
                texto: text,
                media_url: finalMediaUrl,
            },
        });

        // 4. Auto-transition: if the lead is still NUEVO, mark it as EN PROCESO
        //    since there is now an active conversation going on.
        if (lead.estado === 'NUEVO') {
            await this.prisma.crmLead.update({
                where: { id_lead: lead.id_lead },
                data: { estado: 'EN PROCESO' },
            });
            console.log(`[WhatsApp] Lead ${lead.id_lead} auto-transitioned NUEVO → EN PROCESO`);
            this.eventsService.emit({ type: 'lead_actualizado', payload: { id_lead: lead.id_lead, estado: 'EN PROCESO' } });
        }
        
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
                media_url: finalMediaUrl,
                creado_en: mensaje.creado_en,
            },
        });

        // AI intervention - only if enabled for this lead
        try {
            if (lead.ia_activa) {
                console.log(`[WhatsApp] Calling AiService for lead ${lead.id_lead}...`);
                const aiResult = await this.aiService.chat(lead.id_lead, text, true);
                
                if (aiResult && aiResult.respuesta) {
                    // Remove internal AI markers before sending to actual user
                    let answerToSend = aiResult.respuesta;
                    const markerIdx = answerToSend.indexOf('<!--RENAV_PROPS:');
                    if (markerIdx !== -1) {
                        answerToSend = answerToSend.slice(0, markerIdx).trimEnd();
                    }

                    let resultMsg;
                    if (aiResult.mediaUrl) {
                        resultMsg = await this.sender.sendMedia(fromPhone, aiResult.mediaUrl, answerToSend);
                        console.log(`[WhatsApp] AI responded with Media to ${cleanPhone}`);
                    } else if (aiResult.botones && aiResult.botones.length > 0) {
                        resultMsg = await this.sender.sendInteractiveButtons(fromPhone, answerToSend, aiResult.botones);
                        console.log(`[WhatsApp] AI responded with Interactive Buttons to ${cleanPhone}`);
                    } else {
                        resultMsg = await this.sender.sendMessage(fromPhone, answerToSend);
                        console.log(`[WhatsApp] AI responded to ${cleanPhone}`);
                    }

                    // Capture wamid and update message record for status tracking
                    const wamid = resultMsg?.messages?.[0]?.id;
                    if (wamid && aiResult.messageId) {
                        await this.prisma.crmMensaje.update({
                            where: { id_mensaje: aiResult.messageId },
                            data: { whatsapp_msg_id: wamid },
                        });
                    }
                }
            } else {
                console.log(`[WhatsApp] AI is PAUSED for lead ${lead.id_lead}. No auto-reply.`);
            }
        } catch (e) {
            console.error(`[WhatsApp] Error calling AI for lead ${lead.id_lead}:`, e);
        }
    }

    /**
     * Procesa una actualización de estado de WhatsApp (entregado, leído, etc.)
     */
    async processStatusUpdate(wamid: string, status: string) {
        try {
            // Buscamos el mensaje por su ID de WhatsApp
            const mensaje = await this.prisma.crmMensaje.findUnique({
                where: { whatsapp_msg_id: wamid },
                select: { id_mensaje: true, id_lead: true, estatus_entrega: true },
            });

            if (!mensaje) {
                // Puede ser un mensaje enviado fuera del CRM o un ID no registrado aún
                return;
            }

            // Mapeo de estados de Meta a nuestro sistema
            // meta: 'sent', 'delivered', 'read', 'failed'
            const newStatus = status === 'SENT' ? 'ENVIADO' : 
                             status === 'DELIVERED' ? 'ENTREGADO' : 
                             status === 'READ' ? 'LEIDO' : 
                             status === 'FAILED' ? 'FALLIDO' : status;

            // Log the status so we can see what's happening
            console.log(`[WhatsApp] Raw Status received for ${wamid}: ${status} -> ${newStatus}`);

            const statusOrder = { 'FALLIDO': 6, 'ENVIADO': 1, 'ENTREGADO': 2, 'LEIDO': 3 };
            const currentScore = statusOrder[mensaje.estatus_entrega] || 0;
            const newScore = statusOrder[newStatus] || 0;

            if (newScore > currentScore || newStatus === 'FALLIDO') {
                await this.prisma.crmMensaje.update({
                    where: { id_mensaje: mensaje.id_mensaje },
                    data: { estatus_entrega: newStatus },
                });

                // Notificar al frontend vía SSE
                this.eventsService.emit({
                    type: 'mensaje_estatus_actualizado',
                    payload: {
                        id_lead: mensaje.id_lead,
                        id_mensaje: mensaje.id_mensaje,
                        estatus: newStatus,
                    },
                });
                
                console.log(`[WhatsApp] Status updated for msg ${wamid}: ${newStatus}`);
            }
        } catch (err) {
            console.error(`[WhatsApp] Error processing status update for ${wamid}:`, err);
        }
    }
}
