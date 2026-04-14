import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class WhatsappSenderService {
    private readonly logger = new Logger(WhatsappSenderService.name);

    constructor(
        private readonly configService: ConfigService,
        private readonly prisma: PrismaService,
    ) {}

    async sendMessage(toPhone: string, text: string): Promise<any> {
        const token = this.configService.get<string>('WHATSAPP_TOKEN');
        const phoneId = this.configService.get<string>('WHATSAPP_PHONE_ID');

        if (!token || !phoneId) {
            this.logger.warn('WHATSAPP_TOKEN o WHATSAPP_PHONE_ID no configurados — mensaje no enviado');
            return null;
        }

        // Limpiar número: quitar +, espacios, guiones → sólo dígitos
        const cleanPhone = toPhone.replace(/\D/g, '');

        const url = `https://graph.facebook.com/v18.0/${phoneId}/messages`;

        this.logger.log(`[WhatsApp] Enviando a ${cleanPhone} vía phone_id=${phoneId}`);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messaging_product: 'whatsapp',
                recipient_type: 'individual',
                to: cleanPhone,
                type: 'text',
                text: { preview_url: false, body: text },
            }),
        });

        const result = await response.json();

        if (!response.ok || result.error) {
            this.logger.error(`[WhatsApp] API error: ${JSON.stringify(result.error ?? result)}`);
        } else {
            this.logger.log(`[WhatsApp] Enviado OK → msg_id=${result.messages?.[0]?.id}`);
        }

        return result;
    }

    /**
     * Busca el teléfono del contacto asociado al lead y envía el mensaje.
     * Si el contacto no tiene teléfono, omite el envío silenciosamente.
     */
    async sendMessageToLead(leadId: number, text: string): Promise<void> {
        try {
            const lead = await this.prisma.crmLead.findUnique({
                where: { id_lead: leadId },
                include: { contacto: { select: { telefono: true } } },
            });

            if (!lead) {
                this.logger.warn(`[WhatsApp] Lead ${leadId} no encontrado`);
                return;
            }

            const telefono = lead.contacto?.telefono;
            if (!telefono) {
                this.logger.warn(`[WhatsApp] Lead ${leadId} no tiene teléfono — envío omitido`);
                return;
            }

            await this.sendMessage(telefono, text);
        } catch (err) {
            this.logger.error(`[WhatsApp] Error enviando al lead ${leadId}: ${err.message}`);
            // No relanzamos — no queremos que un fallo de WA rompa el flujo principal
        }
    }
}
