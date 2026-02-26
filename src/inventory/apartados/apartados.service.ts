import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateApartadoDto } from './dto/create-apartado.dto';
import { UpdateApartadoDto } from './dto/update-apartado.dto';
import { InvApartado } from '@prisma/client';

@Injectable()
export class ApartadosService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createApartadoDto: CreateApartadoDto): Promise<InvApartado> {
        // Verificar que la unidad existe
        const unidad = await this.prisma.invUnidad.findUnique({
            where: { id_unidad: createApartadoDto.id_unidad }
        });

        if (!unidad) {
            throw new NotFoundException(`Unit with ID ${createApartadoDto.id_unidad} not found`);
        }

        // Si se pasa lead, verificar que existe
        if (createApartadoDto.id_lead) {
            const lead = await this.prisma.crmLead.findUnique({
                where: { id_lead: createApartadoDto.id_lead }
            });

            if (!lead) {
                throw new NotFoundException(`Lead with ID ${createApartadoDto.id_lead} not found`);
            }
        }

        const data: any = { ...createApartadoDto };

        if (data.fecha_apartado) {
            data.fecha_apartado = new Date(data.fecha_apartado);
        }
        if (data.vence_en) {
            data.vence_en = new Date(data.vence_en);
        }


        return this.prisma.invApartado.create({
            data,
        });
    }

    async findAll(
        skip?: number,
        take?: number,
        id_unidad?: number,
        id_lead?: number,
        status?: boolean
    ): Promise<InvApartado[]> {
        const where: any = {};

        if (id_unidad) where.id_unidad = id_unidad;
        if (id_lead) where.id_lead = id_lead;
        if (status !== undefined) where.status = status;

        return this.prisma.invApartado.findMany({
            skip,
            take,
            where,
            include: {
                unidad: {
                    select: { codigo_unidad: true, desarrollo: { select: { nombre: true } } }
                },
                lead: {
                    select: { contacto: { select: { nombre: true, correo: true, telefono: true } } }
                }
            },
            orderBy: { fecha_apartado: 'desc' },
        });
    }

    async findOne(id: number): Promise<InvApartado> {
        const apartado = await this.prisma.invApartado.findUnique({
            where: { id_apartado: id },
            include: {
                unidad: true,
                lead: {
                    include: {
                        contacto: true
                    }
                }
            }
        });

        if (!apartado) {
            throw new NotFoundException(`Apartado with ID ${id} not found`);
        }

        return apartado;
    }

    async update(id: number, updateApartadoDto: UpdateApartadoDto): Promise<InvApartado> {
        if (updateApartadoDto.id_unidad) {
            const unidad = await this.prisma.invUnidad.findUnique({
                where: { id_unidad: updateApartadoDto.id_unidad }
            });

            if (!unidad) {
                throw new NotFoundException(`Unit with ID ${updateApartadoDto.id_unidad} not found`);
            }
        }

        if (updateApartadoDto.id_lead) {
            const lead = await this.prisma.crmLead.findUnique({
                where: { id_lead: updateApartadoDto.id_lead }
            });

            if (!lead) {
                throw new NotFoundException(`Lead with ID ${updateApartadoDto.id_lead} not found`);
            }
        }

        const data: any = { ...updateApartadoDto };

        if (data.fecha_apartado) {
            data.fecha_apartado = new Date(data.fecha_apartado);
        }
        if (data.vence_en) {
            data.vence_en = new Date(data.vence_en);
        }


        try {
            return await this.prisma.invApartado.update({
                where: { id_apartado: id },
                data,
            });
        } catch (error) {
            // @ts-ignore
            if (error.code === 'P2025') {
                throw new NotFoundException(`Apartado with ID ${id} not found`);
            }
            throw error;
        }
    }

    async remove(id: number): Promise<InvApartado> {
        try {
            return await this.prisma.invApartado.delete({
                where: { id_apartado: id },
            });
        } catch (error) {
            // @ts-ignore
            if (error.code === 'P2025') {
                throw new NotFoundException(`Apartado with ID ${id} not found`);
            }
            throw error;
        }
    }
}
