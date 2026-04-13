import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateTypologyDto } from './dto/create-typology.dto';
import { UpdateTypologyDto } from './dto/update-typology.dto';
import { InvTipologia } from '@prisma/client';

@Injectable()
export class TypologiesService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createTypologyDto: CreateTypologyDto): Promise<InvTipologia> {
        // Verificar que el desarrollo existe
        const desarrollo = await this.prisma.invDesarrollo.findUnique({
            where: { id_desarrollo: createTypologyDto.id_desarrollo }
        });

        if (!desarrollo) {
            throw new NotFoundException(`Development with ID ${createTypologyDto.id_desarrollo} not found`);
        }

        return this.prisma.invTipologia.create({
            data: createTypologyDto,
        });
    }

    async findAll(
        skip?: number,
        take?: number,
        id_desarrollo?: number,
        search?: string
    ): Promise<InvTipologia[]> {
        const where: any = {};

        if (id_desarrollo) where.id_desarrollo = id_desarrollo;
        if (search) {
            where.nombre = { contains: search, mode: 'insensitive' };
        }
        where.activo = true;

        return this.prisma.invTipologia.findMany({
            skip,
            take,
            where,
            include: {
                desarrollo: {
                    select: { nombre: true, inv_ciudad: true }
                }
            },
            orderBy: { id_tipologia: 'desc' },
        });
    }

    async findOne(id: number): Promise<InvTipologia> {
        const tipologia = await this.prisma.invTipologia.findUnique({
            where: { id_tipologia: id },
            include: {
                desarrollo: true,
                unidades: true
            }
        });

        if (!tipologia || !tipologia.activo) {
            throw new NotFoundException(`Typology with ID ${id} not found`);
        }

        return tipologia;
    }

    async update(id: number, updateTypologyDto: UpdateTypologyDto): Promise<InvTipologia> {
        if (updateTypologyDto.id_desarrollo) {
            const desarrollo = await this.prisma.invDesarrollo.findUnique({
                where: { id_desarrollo: updateTypologyDto.id_desarrollo }
            });

            if (!desarrollo) {
                throw new NotFoundException(`Development with ID ${updateTypologyDto.id_desarrollo} not found`);
            }
        }

        try {
            return await this.prisma.invTipologia.update({
                where: { id_tipologia: id },
                data: updateTypologyDto,
            });
        } catch (error) {
            // @ts-ignore
            if (error.code === 'P2025') {
                throw new NotFoundException(`Typology with ID ${id} not found`);
            }
            throw error;
        }
    }

    async remove(id: number): Promise<InvTipologia> {
        try {
            return await this.prisma.invTipologia.update({
                where: { id_tipologia: id },
                data: { activo: false }
            });
        } catch (error) {
            // @ts-ignore
            if (error.code === 'P2025') {
                throw new NotFoundException(`Typology with ID ${id} not found`);
            }
            throw error;
        }
    }
}
