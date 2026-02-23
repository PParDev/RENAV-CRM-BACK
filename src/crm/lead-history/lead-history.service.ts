import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateLeadHistoryDto, UpdateLeadHistoryDto } from './dto/create-lead-history.dto';
import { CrmHistorialEtapaLead } from '@prisma/client';

@Injectable()
export class LeadHistoryService {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateLeadHistoryDto): Promise<CrmHistorialEtapaLead> {
        return this.prisma.crmHistorialEtapaLead.create({ data });
    }

    async findAll(leadId?: number): Promise<CrmHistorialEtapaLead[]> {
        const where = leadId ? { id_lead: leadId } : {};
        return this.prisma.crmHistorialEtapaLead.findMany({
            where,
            orderBy: { cambiado_en: 'desc' },
            include: { lead: true, etapa: true, usuario: true }
        });
    }

    async findOne(id: number): Promise<CrmHistorialEtapaLead> {
        const history = await this.prisma.crmHistorialEtapaLead.findUnique({
            where: { id_historial: id },
            include: { lead: true, etapa: true, usuario: true }
        });
        if (!history) throw new NotFoundException('History record not found');
        return history;
    }

    async update(id: number, data: UpdateLeadHistoryDto): Promise<CrmHistorialEtapaLead> {
        try {
            return await this.prisma.crmHistorialEtapaLead.update({
                where: { id_historial: id },
                data,
            });
        } catch (error) {
            throw new NotFoundException('History record not found');
        }
    }

    async remove(id: number): Promise<CrmHistorialEtapaLead> {
        try {
            return await this.prisma.crmHistorialEtapaLead.delete({
                where: { id_historial: id },
            });
        } catch (error) {
            throw new NotFoundException('History record not found');
        }
    }
}
