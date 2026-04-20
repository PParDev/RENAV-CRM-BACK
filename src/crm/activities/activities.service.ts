
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { CrmActividad } from '@prisma/client';

@Injectable()
export class ActivitiesService {
    constructor(private readonly prisma: PrismaService) { }

    // Crea una nueva actividad (llamada, nota, tarea, etc.) asociada a un lead
    async create(createActivityDto: CreateActivityDto): Promise<CrmActividad> {
        const { tipo, ...rest } = createActivityDto;
        return this.prisma.crmActividad.create({
            data: {
                ...rest,
                tipo,
            },
        });
    }

    // Obtiene todo el historial de actividades de un lead en específico
    async findAllByLead(leadId: number): Promise<CrmActividad[]> {
        return this.prisma.crmActividad.findMany({
            where: { id_lead: leadId, activo: true },
            orderBy: { creada_en: 'desc' },
            include: { usuario: true },
        });
    }

    // Obtiene todas las actividades, con opción de filtrar por un lead
    async findAll(leadId?: number): Promise<CrmActividad[]> {
        const where: any = leadId ? { id_lead: leadId } : {};
        where.activo = true;
        return this.prisma.crmActividad.findMany({
            where,
            orderBy: { creada_en: 'desc' },
            include: { lead: { include: { contacto: true } }, usuario: true },
        });
    }

    // Busca una actividad específica por su ID
    async findOne(id: number): Promise<CrmActividad> {
        const activity = await this.prisma.crmActividad.findUnique({
            where: { id_actividad: id },
        });

        if (!activity || !activity.activo) {
            throw new NotFoundException(`Activity with ID ${id} not found`);
        }

        return activity;
    }

    // Actualiza la información de una actividad (por ejemplo: re-agendar o marcar completada)
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

    // Elimina una actividad de la base de datos
    async remove(id: number): Promise<CrmActividad> {
        try {
            return await this.prisma.crmActividad.update({
                where: { id_actividad: id },
                data: { activo: false }
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
