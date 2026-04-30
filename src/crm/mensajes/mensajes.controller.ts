import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MensajesService } from './mensajes.service';
import { WhatsappSenderService } from '../../whatsapp/whatsapp-sender.service';
import { InstagramSenderService } from '../../instagram/instagram-sender.service';
import { PrismaService } from '../../database/prisma.service';

@Controller('mensajes')
export class MensajesController {
    constructor(
        private readonly mensajesService: MensajesService,
        private readonly whatsappSender: WhatsappSenderService,
        private readonly instagramSender: InstagramSenderService,
        private readonly prisma: PrismaService,
    ) { }

    @Post()
    async create(@Body() body: any) {
        const mensaje = await this.mensajesService.create({
            id_lead: body.id_lead ? Number(body.id_lead) : undefined,
            id_usuario: body.id_usuario ? Number(body.id_usuario) : undefined,
            es_entrante: Boolean(body.es_entrante),
            canal: body.canal,
            texto: body.texto,
            media_url: body.media_url,
        });

        // Reenviar por el canal correspondiente si es mensaje saliente
        if (!mensaje.es_entrante && mensaje.id_lead) {
            if (mensaje.canal === 'WHATSAPP') {
                const waMsgId = await this.whatsappSender.sendMessageToLead(mensaje.id_lead, mensaje.texto, mensaje.media_url || undefined);
                if (waMsgId) {
                    await this.mensajesService.update(mensaje.id_mensaje, { whatsapp_msg_id: waMsgId });
                }
            } else if (mensaje.canal === 'INSTAGRAM') {
                // Obtener el igsid del contacto del lead
                const lead = await this.prisma.crmLead.findUnique({
                    where: { id_lead: mensaje.id_lead },
                    include: { contacto: true }
                });
                
                if (lead?.contacto?.instagram_id) {
                    if (mensaje.media_url) {
                        await this.instagramSender.sendImage(lead.contacto.instagram_id, mensaje.media_url);
                    }
                    await this.instagramSender.sendMessage(lead.contacto.instagram_id, mensaje.texto);
                }
            }
        }

        return mensaje;
    }

    @Get('lead/:id')
    findByLead(@Param('id') id: string) {
        return this.mensajesService.findAllByLead(Number(id));
    }
}
