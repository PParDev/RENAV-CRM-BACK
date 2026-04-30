import { Controller, Get, Post, Body, Query, HttpCode, HttpStatus, Res, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InstagramService } from './instagram.service';
import type { Response } from 'express';

@Controller('instagram')
export class InstagramController {
    private readonly logger = new Logger(InstagramController.name);

    constructor(
        private readonly instagramService: InstagramService,
        private readonly configService: ConfigService,
    ) { }

    /**
     * Verificación del Webhook de Meta (Handshake)
     */
    @Get('webhook')
    verifyWebhook(
        @Query('hub.mode') mode: string,
        @Query('hub.verify_token') token: string,
        @Query('hub.challenge') challenge: string,
        @Res() res: Response,
    ) {
        const verifyToken = this.configService.get<string>('INSTAGRAM_VERIFY_TOKEN') || 'RENAV_SECRET_123';

        if (mode && token) {
            if (mode === 'subscribe' && token === verifyToken) {
                this.logger.log('INSTAGRAM WEBHOOK_VERIFIED');
                return res.status(HttpStatus.OK).send(challenge);
            } else {
                return res.sendStatus(HttpStatus.FORBIDDEN);
            }
        }
        return res.sendStatus(HttpStatus.BAD_REQUEST);
    }

    /**
     * Recepción de mensajes de Instagram Direct
     */
    @Post('webhook')
    @HttpCode(HttpStatus.OK)
    async handleIncomingMessage(@Body() body: any) {
        // LOG COMPLETO para diagnóstico
        this.logger.log(`[Instagram] Webhook recibido: ${JSON.stringify(body, null, 2)}`);

        // Estructura de Instagram Direct: entry[0].messaging[0]
        const entry = body?.entry?.[0];
        if (!entry) {
            this.logger.warn('[Instagram] No entry en payload');
            return 'no_entry';
        }

        const messaging = entry.messaging?.[0];
        // Instagram también puede mandar "changes" en lugar de "messaging"
        const changes = entry.changes?.[0];
        
        this.logger.log(`[Instagram] entry keys: ${Object.keys(entry).join(', ')}`);

        if (!messaging && !changes) {
            this.logger.warn('[Instagram] No messaging ni changes en entry');
            return 'no_messaging';
        }

        const senderId = messaging?.sender?.id || changes?.value?.sender?.igsid;
        const messageText = messaging?.message?.text || changes?.value?.messages?.[0]?.text?.body;

        this.logger.log(`[Instagram] senderId=${senderId}, text=${messageText}`);

        if (senderId && messageText) {
            const username = `Instagram User ${senderId.slice(-4)}`;
            await this.instagramService.processMessage(senderId, messageText, username);
        }

        return 'EVENT_RECEIVED';
    }
}
