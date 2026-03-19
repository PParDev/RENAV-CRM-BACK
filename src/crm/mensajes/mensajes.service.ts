import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class MensajesService {
    constructor(private prisma: PrismaService) { }

    async create(data: { id_lead: number; id_usuario?: number; es_entrante: boolean; canal?: string; texto: string; media_url?: string }) {
        return this.prisma.crmMensaje.create({
            data: {
                id_lead: data.id_lead,
                id_usuario: data.id_usuario,
                es_entrante: data.es_entrante,
                canal: data.canal || 'WEB',
                texto: data.texto,
                media_url: data.media_url,
            },
        });
    }

    async findAllByLead(id_lead: number) {
        return this.prisma.crmMensaje.findMany({
            where: { id_lead },
            orderBy: { creado_en: 'asc' },
        });
    }
}
