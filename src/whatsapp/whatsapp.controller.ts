import { Controller, Get, Post, Body, Query, HttpCode, HttpStatus, Res, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WhatsappService } from './whatsapp.service';
import type { Request, Response } from 'express';

@Controller('whatsapp')
export class WhatsappController {
    constructor(
        private readonly whatsappService: WhatsappService,
        private readonly configService: ConfigService,
    ) { }

    @Get('webhook')
    verifyWebhook(
        @Query('hub.mode') mode: string,
        @Query('hub.verify_token') token: string,
        @Query('hub.challenge') challenge: string,
        @Res() res: Response,
    ) {
        const verifyToken = this.configService.get<string>('WHATSAPP_VERIFY_TOKEN');

        if (mode && token) {
            if (mode === 'subscribe' && token === verifyToken) {
                console.log('WEBHOOK_VERIFIED');
                return res.status(HttpStatus.OK).send(challenge);
            } else {
                return res.sendStatus(HttpStatus.FORBIDDEN);
            }
        }
        return res.sendStatus(HttpStatus.BAD_REQUEST);
    }

    @Post('webhook')
    @HttpCode(HttpStatus.OK)
    async handleIncomingMessage(@Body() body: any) {
        // According to Meta documentation, always return 200 OK
        const value = body?.entry?.[0]?.changes?.[0]?.value;
        if (!value) return 'no_value';

        // 1. Mensajes entrantes
        if (value.messages && value.messages[0]) {
            const phoneNumber = value.messages[0].from;
            const msgBody = value.messages[0].text?.body;
            const contactName = value.contacts?.[0]?.profile?.name || 'Cliente de WhatsApp';

            if (msgBody && phoneNumber) {
                await this.whatsappService.processMessage(phoneNumber, msgBody, contactName);
            }
        }

        // 2. Actualizaciones de estado (Enviado, Entregado, Leído)
        if (value.statuses && value.statuses[0]) {
            const statusObj = value.statuses[0];
            const wamid = statusObj.id;
            const status = statusObj.status; // 'sent', 'delivered', 'read'
            if (wamid && status) {
                await this.whatsappService.processStatusUpdate(wamid, status.toUpperCase());
            }
        }

        return 'EVENT_RECEIVED';
    }
}
