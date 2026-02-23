import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateLeadServiceDto, UpdateLeadServiceDto } from './dto/create-lead-service.dto';
import { CrmLeadServicio } from '@prisma/client';

@Injectable()
export class LeadServicesService {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateLeadServiceDto): Promise<CrmLeadServicio> {
        return this.prisma.crmLeadServicio.create({ data });
    }

    async findAll(leadId?: number): Promise<CrmLeadServicio[]> {
        const where = leadId ? { id_lead: leadId } : {};
        return this.prisma.crmLeadServicio.findMany({
            where,
            include: { lead: true, servicio: true }
        });
    }

    async findOne(id: number): Promise<CrmLeadServicio> {
        const rs = await this.prisma.crmLeadServicio.findUnique({
            where: { id_lead_servicio: id },
            include: { lead: true, servicio: true }
        });
        if (!rs) throw new NotFoundException('Lead service not found');
        return rs;
    }

    async update(id: number, data: UpdateLeadServiceDto): Promise<CrmLeadServicio> {
        try {
            return await this.prisma.crmLeadServicio.update({
                where: { id_lead_servicio: id },
                data,
            });
        } catch (error) {
            throw new NotFoundException('Lead service not found');
        }
    }

    async remove(id: number): Promise<CrmLeadServicio> {
        try {
            return await this.prisma.crmLeadServicio.delete({
                where: { id_lead_servicio: id },
            });
        } catch (error) {
            throw new NotFoundException('Lead service not found');
        }
    }
}
