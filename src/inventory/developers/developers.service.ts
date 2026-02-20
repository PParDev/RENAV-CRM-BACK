
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { InvDesarrollador } from '@prisma/client';

@Injectable()
export class DevelopersService {
    constructor(private readonly prisma: PrismaService) { }

    // Da de alta a un nuevo desarrollador inmobiliario
    async create(createDeveloperDto: CreateDeveloperDto): Promise<InvDesarrollador> {
        return this.prisma.invDesarrollador.create({
            data: createDeveloperDto,
        });
    }

    // Lista a todos los desarrolladores, permitiendo buscar por su nombre
    async findAll(search?: string): Promise<InvDesarrollador[]> {
        const where = search ? {
            nombre: { contains: search, mode: 'insensitive' as const },
        } : undefined;

        return this.prisma.invDesarrollador.findMany({
            where,
            orderBy: { nombre: 'asc' },
        });
    }

    // Obtiene la información detallada de un desarrollador en específico
    async findOne(id: number): Promise<InvDesarrollador> {
        const developer = await this.prisma.invDesarrollador.findUnique({
            where: { id_desarrollador: id },
        });

        if (!developer) {
            throw new NotFoundException(`Developer with ID ${id} not found`);
        }

        return developer;
    }

    // Actualiza los datos de un desarrollador
    async update(id: number, updateDeveloperDto: UpdateDeveloperDto): Promise<InvDesarrollador> {
        try {
            return await this.prisma.invDesarrollador.update({
                where: { id_desarrollador: id },
                data: updateDeveloperDto,
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
    async remove(id: number): Promise<InvDesarrollador> {
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
