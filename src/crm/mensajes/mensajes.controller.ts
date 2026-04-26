import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MensajesService } from './mensajes.service';
import { WhatsappSenderService } from '../../whatsapp/whatsapp-sender.service';

@Controller('mensajes')
export class MensajesController {
    constructor(
        private readonly mensajesService: MensajesService,
        private readonly whatsappSender: WhatsappSenderService,
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

        // Reenviar por WhatsApp si es mensaje saliente del agente Y tiene un lead asociado
        if (!mensaje.es_entrante && mensaje.id_lead) {
            const waMsgId = await this.whatsappSender.sendMessageToLead(mensaje.id_lead, mensaje.texto, mensaje.media_url || undefined);
            if (waMsgId) {
                await this.mensajesService.update(mensaje.id_mensaje, { whatsapp_msg_id: waMsgId });
            }
        }

        return mensaje;
    }

    @Get('lead/:id')
    findByLead(@Param('id') id: string) {
        return this.mensajesService.findAllByLead(Number(id));
    }
}
