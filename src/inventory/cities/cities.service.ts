
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CitiesService {
    constructor(private readonly prisma: PrismaService) { }

    // Registra una nueva ciudad en el catálogo de ubicaciones
    async create(createCityDto: CreateCityDto) {
        return this.prisma.invCiudad.create({
            data: createCityDto,
        });
    }

    // Obtiene todas las ciudades registradas alfabéticamente
    async findAll() {
        return this.prisma.invCiudad.findMany({
            orderBy: { nombre: 'asc' },
        });
    }

    // Busca los datos de una ciudad en específico por su ID
    async findOne(id: number) {
        const city = await this.prisma.invCiudad.findUnique({
            where: { id_inv_ciudad: id },
        });
        if (!city) throw new NotFoundException('City not found');
        return city;
    }

    // Actualiza el nombre o datos de una ciudad
    async update(id: number, updateCityDto: UpdateCityDto) {
        try {
            return await this.prisma.invCiudad.update({
                where: { id_inv_ciudad: id },
                data: updateCityDto,
            });
        } catch (e: any) {
            if (e.code === 'P2025') throw new NotFoundException('City not found');
            throw e;
        }
    }

    // Elimina una ciudad del catálogo
    async remove(id: number) {
        try {
            return await this.prisma.invCiudad.delete({
                where: { id_inv_ciudad: id },
            });
        } catch (e: any) {
            if (e.code === 'P2025') throw new NotFoundException('City not found');
            throw e;
        }
    }
}
