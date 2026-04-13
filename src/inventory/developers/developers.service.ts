
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { InvDesarrollador } from '@prisma/client';

@Injectable()
export class DevelopersService {
    constructor(private readonly prisma: PrismaService) { }

    // Da de alta a un nuevo desarrollador inmobiliario
    async create(createDeveloperDto: CreateDeveloperDto) {
        const { zonas, ...data } = createDeveloperDto;
        return this.prisma.invDesarrollador.create({
            data: {
                ...data,
                ...(zonas && zonas.length > 0 ? {
                    zonas: {
                        create: zonas.map(id_zona => ({ id_zona }))
                    }
                } : {})
            },
            include: { zonas: true },
        });
    }

    // Lista a todos los desarrolladores, permitiendo buscar por su nombre
    async findAll(search?: string) {
        const where: any = search ? {
            nombre: { contains: search, mode: 'insensitive' as const },
        } : {};
        where.activo = true;

        return this.prisma.invDesarrollador.findMany({
            where,
            orderBy: { nombre: 'asc' },
            include: { zonas: { include: { zona: true } } },
        });
    }

    // Lista los desarrolladores en la papelera (con días restantes)
    async findDeleted() {
        const items = await this.prisma.invDesarrollador.findMany({
            where: { activo: false, deletedAt: { not: null } },
            include: {
                zonas: { include: { zona: true } },
                desarrollos: { where: { activo: false, deletedAt: { not: null } }, select: { id_desarrollo: true } },
            },
            orderBy: { deletedAt: 'desc' },
        });

        return items.map(item => {
            const daysLeft = item.deletedAt
                ? Math.max(0, 7 - Math.floor((Date.now() - new Date(item.deletedAt).getTime()) / (1000 * 60 * 60 * 24)))
                : 0;
            return { ...item, daysLeft, totalDesarrollos: item.desarrollos.length };
        });
    }


    // Obtiene la información detallada de un desarrollador en específico
    async findOne(id: number) {
        const developer = await this.prisma.invDesarrollador.findUnique({
            where: { id_desarrollador: id },
            include: { zonas: { include: { zona: true } } },
        });

        if (!developer || !developer.activo) {
            throw new NotFoundException(`Developer with ID ${id} not found`);
        }

        return developer;
    }

    // Actualiza los datos de un desarrollador
    async update(id: number, updateDeveloperDto: UpdateDeveloperDto) {
        const { zonas, ...data } = updateDeveloperDto;
        try {
            return await this.prisma.invDesarrollador.update({
                where: { id_desarrollador: id },
                data: {
                    ...data,
                    ...(zonas !== undefined ? {
                        zonas: {
                            deleteMany: {},
                            create: zonas.map(id_zona => ({ id_zona }))
                        }
                    } : {})
                },
                include: { zonas: { include: { zona: true } } },
            });
        } catch (error) {
            // @ts-ignore
            if (error.code === 'P2025') {
                throw new NotFoundException(`Developer with ID ${id} not found`);
            }
            throw error;
        }
    }

    // Elimina un desarrollador de la base de datos (soft delete & cascade)
    async remove(id: number) {
        try {
            // Encuentra los desarrollos asociados
            const developments = await this.prisma.invDesarrollo.findMany({
                where: { id_desarrollador: id, activo: true },
                select: { id_desarrollo: true }
            });
            const desarrolloIds = developments.map(d => d.id_desarrollo);

            if (desarrolloIds.length > 0) {
                // Cascading a unidades
                await this.prisma.invUnidad.updateMany({
                    where: { id_desarrollo: { in: desarrolloIds }, activo: true },
                    data: { activo: false, deletedAt: new Date() }
                });

                // Cascading a desarrollos
                await this.prisma.invDesarrollo.updateMany({
                    where: { id_desarrollador: id, activo: true },
                    data: { activo: false, deletedAt: new Date() }
                });
            }

            return await this.prisma.invDesarrollador.update({
                where: { id_desarrollador: id },
                data: { activo: false, deletedAt: new Date() }
            });
        } catch (error) {
            // @ts-ignore
            if (error.code === 'P2025') {
                throw new NotFoundException(`Developer with ID ${id} not found`);
            }
            throw error;
        }
    }

    // Restaura un desarrollador y sus desarrollos/unidades
    async restore(id: number) {
        try {
            const developments = await this.prisma.invDesarrollo.findMany({
                where: { id_desarrollador: id },
                select: { id_desarrollo: true }
            });
            const desarrolloIds = developments.map(d => d.id_desarrollo);

            if (desarrolloIds.length > 0) {
                await this.prisma.invUnidad.updateMany({
                    where: { id_desarrollo: { in: desarrolloIds }, activo: false, deletedAt: { not: null } },
                    data: { activo: true, deletedAt: null }
                });

                await this.prisma.invDesarrollo.updateMany({
                    where: { id_desarrollador: id, activo: false, deletedAt: { not: null } },
                    data: { activo: true, deletedAt: null }
                });
            }

            return await this.prisma.invDesarrollador.update({
                where: { id_desarrollador: id },
                data: { activo: true, deletedAt: null }
            });
        } catch (error) {
            // @ts-ignore
            if (error.code === 'P2025') {
                throw new NotFoundException(`Developer with ID ${id} not found`);
            }
            throw error;
        }
    }
}
