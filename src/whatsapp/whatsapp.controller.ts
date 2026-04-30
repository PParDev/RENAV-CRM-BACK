import { Controller, Get, Post, Body, Query, HttpCode, HttpStatus, Res, Req, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WhatsappService } from './whatsapp.service';
import { InstagramService } from '../instagram/instagram.service';
import type { Request, Response } from 'express';

@Controller('whatsapp')
export class WhatsappController {
    private readonly logger = new Logger(WhatsappController.name);

    constructor(
        private readonly whatsappService: WhatsappService,
        private readonly instagramService: InstagramService,
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
        this.logger.log(`[Meta Webhook] object=${body?.object}`);
        
        // ─── Instagram Direct Messages ──────────────────────────────────────────
        // Meta sends IG DMs via the same App webhook but with object='instagram'
        if (body?.object === 'instagram') {
            const entry = body?.entry?.[0];
            const messaging = entry?.messaging?.[0];
            if (messaging?.sender?.id && messaging?.message?.text) {
                const senderId = messaging.sender.id;
                const text = messaging.message.text;
                const username = `Instagram User ${senderId.slice(-4)}`;
                this.logger.log(`[Instagram] DM de ${senderId}: ${text}`);
                await this.instagramService.processMessage(senderId, text, username);
            }
            return 'EVENT_RECEIVED';
        }

        // ─── WhatsApp ──────────────────────────────────────────────────────────
        const value = body?.entry?.[0]?.changes?.[0]?.value;
        if (!value) return 'no_value';

        // 1. Mensajes entrantes
        if (value.messages && value.messages[0]) {
            const message = value.messages[0];
            const phoneNumber = message.from;
            const contactName = value.contacts?.[0]?.profile?.name || 'Cliente de WhatsApp';
            
            let msgBody = message.text?.body;
            let mediaId = undefined;

            if (message.type === 'image') {
                mediaId = message.image?.id;
                msgBody = msgBody || message.image?.caption || '📸 Imagen';
            } else if (message.type === 'document') {
                mediaId = message.document?.id;
                msgBody = msgBody || message.document?.caption || message.document?.filename || '📎 Documento';
            } else if (message.type === 'video') {
                mediaId = message.video?.id;
                msgBody = msgBody || message.video?.caption || '🎥 Video';
            } else if (message.type === 'audio') {
                mediaId = message.audio?.id;
                msgBody = msgBody || '🎵 Audio';
            } else if (message.type === 'sticker') {
                mediaId = message.sticker?.id;
                msgBody = msgBody || '👾 Sticker';
            } else if (message.type === 'voice') {
                mediaId = message.voice?.id;
                msgBody = msgBody || '🎤 Nota de Voz';
            }

            if ((msgBody !== undefined || mediaId) && phoneNumber) {
                await this.whatsappService.processMessage(phoneNumber, msgBody || '', contactName, mediaId);
            }
        }

        // 2. Actualizaciones de estado (Enviado, Entregado, Leído)
        if (value.statuses && value.statuses[0]) {
            const statuses = value.statuses;
            for (const status of statuses) {
                if (status.status === 'failed' || status.errors) {
                    console.error(`[WhatsApp] Webhook Failed Status for ${status.id}:`, JSON.stringify(status.errors));
                }
                await this.whatsappService.processStatusUpdate(status.id, status.status.toUpperCase());
            }
        }

        return 'EVENT_RECEIVED';
    }
}
