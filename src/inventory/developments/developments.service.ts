
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
    async create(createDevelopmentDto: CreateDevelopmentDto): Promise<InvDesarrollo> {
        return this.prisma.invDesarrollo.create({
            data: createDevelopmentDto,
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
            },
            orderBy: { creado_en: 'desc' },
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
                tipologias: true,
                unidades: {
                    select: { id_unidad: true, codigo_unidad: true, precios_lista: true, m2_construccion: true, id_estado_unidad: true } // Simple list of units
                }
            },
        });

        if (!development) {
            throw new NotFoundException(`Development with ID ${id} not found`);
        }

        return development;
    }

    // Actualiza la información principal de un desarrollo
    async update(id: number, updateDevelopmentDto: UpdateDevelopmentDto): Promise<InvDesarrollo> {
        try {
            return await this.prisma.invDesarrollo.update({
                where: { id_desarrollo: id },
                data: updateDevelopmentDto,
            });
        } catch (error) {
            // @ts-ignore
            if (error.code === 'P2025') {
                throw new NotFoundException(`Development with ID ${id} not found`);
            }
            throw error;
        }
    }

    // Elimina un desarrollo del registro
    async remove(id: number): Promise<InvDesarrollo> {
        try {
            return await this.prisma.invDesarrollo.delete({
                where: { id_desarrollo: id },
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
