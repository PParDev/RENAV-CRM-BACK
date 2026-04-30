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
                ...(data.id_lead   ? { lead:    { connect: { id_lead:    data.id_lead   } } } : {}),
                ...(data.id_usuario ? { usuario: { connect: { id_usuario: data.id_usuario } } } : {}),
                es_entrante: data.es_entrante,
                canal: data.canal || 'WEB',
                texto: data.texto,
                media_url: data.media_url,
            },
        });

        // Auto-transition: if the lead is still NUEVO LEAD or NUEVO, move it to DIAGNOSTICO
        if (data.id_lead) {
            const currentLead = await this.prisma.crmLead.findUnique({ where: { id_lead: data.id_lead } });
            if (currentLead && (currentLead.estado === 'NUEVO LEAD' || currentLead.estado === 'NUEVO')) {
                await this.prisma.crmLead.update({
                    where: { id_lead: data.id_lead },
                    data: { estado: 'DIAGNOSTICO' },
                });
                this.eventsService.emit({ type: 'lead_actualizado', payload: { id_lead: data.id_lead, estado: 'DIAGNOSTICO' } });
            }
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
