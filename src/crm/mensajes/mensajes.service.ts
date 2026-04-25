import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { EventsService } from '../../events/events.service';

@Injectable()
export class MensajesService {
    constructor(
        private prisma: PrismaService,
        private eventsService: EventsService,
    ) { }

    async create(data: { id_lead?: number; id_usuario?: number; es_entrante: boolean; canal?: string; texto: string; media_url?: string }) {
        const msg = await this.prisma.crmMensaje.create({
            data: {
                id_lead: data.id_lead,
                id_usuario: data.id_usuario,
                es_entrante: data.es_entrante,
                canal: data.canal || 'WEB',
                texto: data.texto,
                media_url: data.media_url,
            },
        });

        // Auto-transition: if the lead is still NUEVO, move it to EN PROCESO
        // now that there is active conversation happening.
<<<<<<< Updated upstream
        if (data.id_lead) {
            const lead = await this.prisma.crmLead.findUnique({ where: { id_lead: data.id_lead }, select: { estado: true } });
            if (lead?.estado === 'NUEVO') {
                await this.prisma.crmLead.update({
                    where: { id_lead: data.id_lead },
                    data: { estado: 'EN PROCESO' },
                });
            }
=======
        const lead = await this.prisma.crmLead.findUnique({ where: { id_lead: data.id_lead }, select: { estado: true } });
        if (lead?.estado === 'NUEVO') {
            await this.prisma.crmLead.update({
                where: { id_lead: data.id_lead },
                data: { estado: 'EN PROCESO' },
            });
            this.eventsService.emit({ type: 'lead_actualizado', payload: { id_lead: data.id_lead, estado: 'EN PROCESO' } });
>>>>>>> Stashed changes
        }

        // Notify frontend: new message ready
        this.eventsService.emit({
            type: 'nuevo_mensaje',
            payload: {
                id_lead: msg.id_lead,
                id_mensaje: msg.id_mensaje,
                texto: msg.texto,
                es_entrante: msg.es_entrante,
                canal: msg.canal,
                creado_en: msg.creado_en,
            },
        });

        return msg;
    }

    async update(id_mensaje: number, data: { whatsapp_msg_id?: string; estatus_entrega?: string }) {
        return this.prisma.crmMensaje.update({
            where: { id_mensaje },
            data,
        });
    }

    async findAllByLead(id_lead: number) {
        return this.prisma.crmMensaje.findMany({
            where: { id_lead },
            orderBy: { creado_en: 'asc' },
        });
    }
}
