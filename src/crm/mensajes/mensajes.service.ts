import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class MensajesService {
    constructor(private prisma: PrismaService) { }

    async create(data: { id_lead: number; id_usuario?: number; es_entrante: boolean; canal?: string; texto: string; media_url?: string }) {
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
        const lead = await this.prisma.crmLead.findUnique({ where: { id_lead: data.id_lead }, select: { estado: true } });
        if (lead?.estado === 'NUEVO') {
            await this.prisma.crmLead.update({
                where: { id_lead: data.id_lead },
                data: { estado: 'EN PROCESO' },
            });
        }

        return msg;
    }

    async findAllByLead(id_lead: number) {
        return this.prisma.crmMensaje.findMany({
            where: { id_lead },
            orderBy: { creado_en: 'asc' },
        });
    }
}
