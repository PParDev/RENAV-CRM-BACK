
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { InvUnidad } from '@prisma/client';

@Injectable()
export class UnitsService {
    constructor(private readonly prisma: PrismaService) { }

    // Crea una nueva unidad (casa, departamento, lote) dentro de un desarrollo
    async create(createUnitDto: CreateUnitDto): Promise<InvUnidad> {
        return this.prisma.invUnidad.create({
            data: createUnitDto,
        });
    }

    // Obtiene un listado de unidades, filtrables por desarrollo o código
    async findAll(
        skip?: number,
        take?: number,
        desarrolloId?: number,
        codigo?: string
    ): Promise<InvUnidad[]> {
        const where: any = {};
        if (desarrolloId) where.id_desarrollo = desarrolloId;
        if (codigo) where.codigo_unidad = { contains: codigo, mode: 'insensitive' };

        return this.prisma.invUnidad.findMany({
            skip,
            take,
            where,
            include: {
                desarrollo: true,
                tipologia: true,
                tipo_inmueble: true,
                estado_unidad: true,
                tipo_propiedad: true,
            },
            orderBy: { id_unidad: 'desc' },
        });
    }

    // Busca una unidad en específico, incluyendo su historial de precios y estatus de venta
    async findOne(id: number): Promise<InvUnidad> {
        const unit = await this.prisma.invUnidad.findUnique({
            where: { id_unidad: id },
            include: {
                desarrollo: true,
                tipologia: true,
                tipo_inmueble: true,
                estado_unidad: true,
                tipo_propiedad: true,
                precios_historicos: { orderBy: { vigente_desde: 'desc' } },
                apartados: true,
                ventas: true,
            },
        });

        if (!unit) {
            throw new NotFoundException(`Unit with ID ${id} not found`);
        }

        return unit;
    }

    // Actualiza las características de una unidad
    async update(id: number, updateUnitDto: UpdateUnitDto): Promise<InvUnidad> {
        try {
            // Logic to track price history if price changes could be added here
            return await this.prisma.invUnidad.update({
                where: { id_unidad: id },
                data: updateUnitDto,
            });
        } catch (error) {
            // @ts-ignore
            if (error.code === 'P2025') {
                throw new NotFoundException(`Unit with ID ${id} not found`);
            }
            throw error;
        }
    }

    // Elimina una unidad del sistema
    async remove(id: number): Promise<InvUnidad> {
        try {
            return await this.prisma.invUnidad.delete({
                where: { id_unidad: id },
            });
        } catch (error) {
            // @ts-ignore
            if (error.code === 'P2025') {
                throw new NotFoundException(`Unit with ID ${id} not found`);
            }
            throw error;
        }
    }
}
