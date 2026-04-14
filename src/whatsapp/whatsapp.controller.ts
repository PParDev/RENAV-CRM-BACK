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
        if (body.object) {
            if (
                body.entry &&
                body.entry[0].changes &&
                body.entry[0].changes[0] &&
                body.entry[0].changes[0].value.messages &&
                body.entry[0].changes[0].value.messages[0]
            ) {
                const phoneNumber = body.entry[0].changes[0].value.messages[0].from;
                const msgBody = body.entry[0].changes[0].value.messages[0].text?.body;
                const contactName = body.entry[0].changes[0].value.contacts?.[0]?.profile?.name || 'Cliente de WhatsApp';

                if (msgBody && phoneNumber) {
                    await this.whatsappService.processMessage(phoneNumber, msgBody, contactName);
                }
            }
        }

        return 'EVENT_RECEIVED';
    }
}
