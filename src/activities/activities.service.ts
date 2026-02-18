
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { CrmActividad } from '@prisma/client';

@Injectable()
export class ActivitiesService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createActivityDto: CreateActivityDto): Promise<CrmActividad> {
        const { tipo, ...rest } = createActivityDto;
        return this.prisma.crmActividad.create({
            data: {
                ...rest,
                tipo,
            },
        });
    }

    async findAllByLead(leadId: number): Promise<CrmActividad[]> {
        return this.prisma.crmActividad.findMany({
            where: { id_lead: leadId },
            orderBy: { creada_en: 'desc' },
            include: { usuario: true },
        });
    }

    async findAll(leadId?: number): Promise<CrmActividad[]> {
        const where = leadId ? { id_lead: leadId } : undefined;
        return this.prisma.crmActividad.findMany({
            where,
            orderBy: { creada_en: 'desc' },
            include: { lead: true, usuario: true },
        });
    }

    async findOne(id: number): Promise<CrmActividad> {
        const activity = await this.prisma.crmActividad.findUnique({
            where: { id_actividad: id },
        });

        if (!activity) {
            throw new NotFoundException(`Activity with ID ${id} not found`);
        }

        return activity;
    }

    async update(id: number, updateActivityDto: UpdateActivityDto): Promise<CrmActividad> {
        try {
            return await this.prisma.crmActividad.update({
                where: { id_actividad: id },
                data: updateActivityDto,
            });
        } catch (error) {
            // @ts-ignore
            if (error.code === 'P2025') {
                throw new NotFoundException(`Activity with ID ${id} not found`);
            }
            throw error;
        }
    }

    async remove(id: number): Promise<CrmActividad> {
        try {
            return await this.prisma.crmActividad.delete({
                where: { id_actividad: id },
            });
        } catch (error) {
            // @ts-ignore
            if (error.code === 'P2025') {
                throw new NotFoundException(`Activity with ID ${id} not found`);
            }
            throw error;
        }
    }
}
