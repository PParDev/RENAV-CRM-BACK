
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateDevelopmentDto } from './dto/create-development.dto';
import { UpdateDevelopmentDto } from './dto/update-development.dto';
import { CreateTypologyDto } from './dto/create-typology.dto';
import { InvDesarrollo } from '@prisma/client';

@Injectable()
export class DevelopmentsService {
    constructor(private readonly prisma: PrismaService) { }

    // Da de alta un nuevo desarrollo o proyecto inmobiliario
    async create(createDevelopmentDto: CreateDevelopmentDto) {
        return this.prisma.invDesarrollo.create({
            data: createDevelopmentDto,
            include: { zona: true },
        });
    }

    // Añade una tipología (ej. Casa Modelo A) a un desarrollo
    async addTypology(desarrolloId: number, dto: CreateTypologyDto) {
        const desarrollo = await this.prisma.invDesarrollo.findUnique({
            where: { id_desarrollo: desarrolloId },
        });

        if (!desarrollo) {
            throw new NotFoundException(`Development with ID ${desarrolloId} not found`);
        }

        return this.prisma.invTipologia.create({
            data: {
                id_desarrollo: desarrolloId,
                nombre: dto.nombre,
                total_unidades: dto.total_unidades,
            },
        });
    }

    // Lista los desarrollos con filtros por ciudad, desarrollador o nombre
    async findAll(
        skip?: number,
        take?: number,
        ciudad?: number,
        desarrollador?: number,
        search?: string
    ): Promise<InvDesarrollo[]> {
        const where: any = {};
        if (ciudad) where.ciudad = ciudad;
        if (desarrollador) where.id_desarrollador = desarrollador;
        if (search) {
            where.nombre = { contains: search, mode: 'insensitive' };
        }
        where.activo = true;

        return this.prisma.invDesarrollo.findMany({
            skip,
            take,
            where,
            include: {
                inv_ciudad: true,
                desarrollador: true,
                estado_relacion: true,
                certeza_legal: true,
                estado_doc: true,
                origen_proyecto: true,
                zona: true,
            },
            orderBy: { creado_en: 'desc' },
        });
    }

    // Lista los desarrollos en la papelera (con días restantes)
    async findDeleted() {
        const items = await this.prisma.invDesarrollo.findMany({
            where: { activo: false, deletedAt: { not: null } },
            include: {
                desarrollador: true,
                zona: true,
                unidades: { where: { activo: false, deletedAt: { not: null } }, select: { id_unidad: true } },
            },
            orderBy: { deletedAt: 'desc' },
        });

        return items.map(item => {
            const daysLeft = item.deletedAt
                ? Math.max(0, 7 - Math.floor((Date.now() - new Date(item.deletedAt).getTime()) / (1000 * 60 * 60 * 24)))
                : 0;
            return { ...item, daysLeft, totalUnidades: item.unidades.length };
        });
    }


    // Obtiene todo el detalle de un desarrollo, incluyendo sus tipologías y unidades
    async findOne(id: number): Promise<InvDesarrollo> {
        const development = await this.prisma.invDesarrollo.findUnique({
            where: { id_desarrollo: id },
            include: {
                inv_ciudad: true,
                desarrollador: true,
                estado_relacion: true,
                certeza_legal: true,
                estado_doc: true,
                origen_proyecto: true,
                zona: true,
                tipologias: true,
                unidades: {
                    where: { activo: true },
                    select: { id_unidad: true, codigo_unidad: true, precios_lista: true, m2_construccion: true, id_estado_unidad: true } // Simple list of units
                }
            },
        });

        if (!development || !development.activo) {
            throw new NotFoundException(`Development with ID ${id} not found`);
        }

        return development;
    }

    // Actualiza la información principal de un desarrollo
    async update(id: number, updateDevelopmentDto: UpdateDevelopmentDto) {
        try {
            return await this.prisma.invDesarrollo.update({
                where: { id_desarrollo: id },
                data: updateDevelopmentDto,
                include: { zona: true },
            });
        } catch (error) {
            // @ts-ignore
            if (error.code === 'P2025') {
                throw new NotFoundException(`Development with ID ${id} not found`);
            }
            throw error;
        }
    }

    // Elimina un desarrollo del registro (soft delete & cascade)
    async remove(id: number): Promise<InvDesarrollo> {
        try {
            // First, update units
            await this.prisma.invUnidad.updateMany({
                where: { id_desarrollo: id, activo: true },
                data: { activo: false, deletedAt: new Date() }
            });

            // Then update development
            return await this.prisma.invDesarrollo.update({
                where: { id_desarrollo: id },
                data: { activo: false, deletedAt: new Date() }
            });
        } catch (error) {
            // @ts-ignore
            if (error.code === 'P2025') {
                throw new NotFoundException(`Development with ID ${id} not found`);
            }
            throw error;
        }
    }

    // Restaura un desarrollo y sus unidades que fueron enviadas a la papelera
    async restore(id: number): Promise<InvDesarrollo> {
        try {
            // Restore units that were logically deleted (you could also use another flag if you only want to restore those deleted exactly when the dev was deleted)
            await this.prisma.invUnidad.updateMany({
                where: { id_desarrollo: id, activo: false, deletedAt: { not: null } },
                data: { activo: true, deletedAt: null }
            });

            return await this.prisma.invDesarrollo.update({
                where: { id_desarrollo: id },
                data: { activo: true, deletedAt: null }
            });
        } catch (error) {
            // @ts-ignore
            if (error.code === 'P2025') {
                throw new NotFoundException(`Development with ID ${id} not found`);
            }
            throw error;
        }
    }
}
