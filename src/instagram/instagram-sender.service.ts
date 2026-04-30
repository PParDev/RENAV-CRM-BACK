import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InstagramSenderService {
    private readonly logger = new Logger(InstagramSenderService.name);

    constructor(private readonly configService: ConfigService) {}

    /**
     * Envía un mensaje de texto a un IGSID (Instagram Scoped ID)
     */
    async sendMessage(recipientId: string, text: string): Promise<any> {
        const token = this.configService.get<string>('INSTAGRAM_TOKEN');
        if (!token) {
            this.logger.error('INSTAGRAM_TOKEN no configurado');
            return null;
        }

        const url = `https://graph.facebook.com/v18.0/me/messages`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    recipient: { id: recipientId },
                    message: { text: text },
                }),
            });

            const data = await response.json();
            if (data.error) {
                this.logger.error(`[Instagram] Error enviando mensaje: ${JSON.stringify(data.error)}`);
                return null;
            }

            this.logger.log(`[Instagram] Mensaje enviado a ${recipientId}`);
            return data;
        } catch (error) {
            this.logger.error(`[Instagram] Excepción enviando mensaje: ${error.message}`);
            return null;
        }
    }

    /**
     * Envía una imagen a Instagram
     */
    async sendImage(recipientId: string, imageUrl: string): Promise<any> {
        const token = this.configService.get<string>('INSTAGRAM_TOKEN');
        if (!token) return null;

        const url = `https://graph.facebook.com/v18.0/me/messages`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    recipient: { id: recipientId },
                    message: {
                        attachment: {
                            type: 'image',
                            payload: {
                                url: imageUrl,
                                is_selectable: true
                            }
                        }
                    },
                }),
            });

            return await response.json();
        } catch (error) {
            this.logger.error(`[Instagram] Error enviando imagen: ${error.message}`);
            return null;
        }
    }
}
