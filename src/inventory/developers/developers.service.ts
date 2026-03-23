
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
        const where = search ? {
            nombre: { contains: search, mode: 'insensitive' as const },
        } : undefined;

        return this.prisma.invDesarrollador.findMany({
            where,
            orderBy: { nombre: 'asc' },
            include: { zonas: { include: { zona: true } } },
        });
    }

    // Obtiene la información detallada de un desarrollador en específico
    async findOne(id: number) {
        const developer = await this.prisma.invDesarrollador.findUnique({
            where: { id_desarrollador: id },
            include: { zonas: { include: { zona: true } } },
        });

        if (!developer) {
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

    // Elimina un desarrollador de la base de datos
    async remove(id: number) {
        try {
            return await this.prisma.invDesarrollador.delete({
                where: { id_desarrollador: id },
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
