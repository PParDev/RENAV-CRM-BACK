
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { CrmLead } from '@prisma/client';

@Injectable()
export class LeadsService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createLeadDto: CreateLeadDto): Promise<CrmLead> {
        return this.prisma.crmLead.create({
            data: {
                id_contacto: createLeadDto.id_contacto,
                id_servicio_principal: createLeadDto.id_servicio_principal,
                estado: createLeadDto.estado,
                prioridad: createLeadDto.prioridad || 'MEDIA',
                id_usuario_asignado: createLeadDto.id_usuario_asignado,
                notas_iniciales: createLeadDto.notas_iniciales,
            },
            include: {
                contacto: true,
                usuario_asignado: true,
                servicio_principal: true,
            },
        });
    }

    async findAll(
        skip?: number,
        take?: number,
        estado?: string,
        usuario?: number,
        search?: string
    ): Promise<CrmLead[]> {
        const where: any = {};
        if (estado) where.estado = estado;
        if (usuario) where.id_usuario_asignado = usuario;
        if (search) {
            where.contacto = {
                OR: [
                    { nombre: { contains: search, mode: 'insensitive' } },
                    { correo: { contains: search, mode: 'insensitive' } },
                    { telefono: { contains: search, mode: 'insensitive' } },
                ],
            };
        }

        return this.prisma.crmLead.findMany({
            skip,
            take,
            where,
            include: {
                contacto: true,
                usuario_asignado: true,
                servicio_principal: true,
            },
            orderBy: { creado_en: 'desc' },
        });
    }

    async findOne(id: number): Promise<CrmLead> {
        const lead = await this.prisma.crmLead.findUnique({
            where: { id_lead: id },
            include: {
                contacto: true,
                usuario_asignado: true,
                servicio_principal: true,
                actividades: { orderBy: { creada_en: 'desc' } },
                solicitudes: true,
                historial_etapas: { orderBy: { cambiado_en: 'desc' }, include: { etapa: true, usuario: true } },
            },
        });

        if (!lead) {
            throw new NotFoundException(`Lead with ID ${id} not found`);
        }

        return lead;
    }

    async update(id: number, updateLeadDto: UpdateLeadDto): Promise<CrmLead> {
        const { estado, ...rest } = updateLeadDto;

        try {
            // If status changes, update the lead and possibly add activity/history
            // For now, simpler update
            const data: any = { ...rest };
            if (estado) data.estado = estado;

            const lead = await this.prisma.crmLead.update({
                where: { id_lead: id },
                data,
                include: {
                    contacto: true,
                    usuario_asignado: true,
                    servicio_principal: true,
                },
            });
            return lead;
        } catch (error) {
            if ((error as any).code === 'P2025') {
                throw new NotFoundException(`Lead with ID ${id} not found`);
            }
            throw error;
        }
    }

    async remove(id: number): Promise<CrmLead> {
        try {
            return await this.prisma.crmLead.delete({
                where: { id_lead: id },
            });
        } catch (error) {
            if ((error as any).code === 'P2025') {
                throw new NotFoundException(`Lead with ID ${id} not found`);
            }
            throw error;
        }
    }
}
