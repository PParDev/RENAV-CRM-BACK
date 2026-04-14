import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { AiService } from './ai.service';
import { WhatsappSenderService } from '../whatsapp/whatsapp-sender.service';

class ChatDto {
    @IsNumber()
    id_lead: number;

    @IsString()
    mensaje: string;

    @IsBoolean()
    es_entrante: boolean;
}

@Controller('ai')
export class AiController {
    constructor(
        private readonly aiService: AiService,
        private readonly whatsappSender: WhatsappSenderService,
    ) {}

    @Post('chat')
    async chat(@Body() body: ChatDto) {
        try {
            const result = await this.aiService.chat(
                body.id_lead,
                body.mensaje,
                body.es_entrante ?? true,
            );

            // Enviar respuesta AI por WhatsApp (sólo cuando viene del panel web,
            // no cuando viene del webhook de WhatsApp que ya lo envía por su cuenta)
            if (result?.respuesta) {
                let textoWA = result.respuesta;
                const markerIdx = textoWA.indexOf('<!--RENAV_PROPS:');
                if (markerIdx !== -1) textoWA = textoWA.slice(0, markerIdx).trimEnd();
                this.whatsappSender.sendMessageToLead(body.id_lead, textoWA);
            }

            return result;
        } catch (err) {
            throw new HttpException(
                err.message || 'Error al procesar el mensaje con IA',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
