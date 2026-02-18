
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class CatalogsService {
    constructor(private readonly prisma: PrismaService) { }

    async getServicios() {
        return this.prisma.catServicios.findMany({
            orderBy: { nombre: 'asc' },
        });
    }

    async getMetodosPago() {
        return this.prisma.catMetodoPago.findMany({
            orderBy: { nombre: 'asc' },
        });
    }

    async getTiposInmueble() {
        return this.prisma.catTipoInmueble.findMany({
            orderBy: { nombre: 'asc' },
        });
    }

    async getTiposProyecto() {
        return this.prisma.catTipoProyecto.findMany({
            orderBy: { nombre: 'asc' },
        });
    }

    async getSubtiposHabitacional() {
        return this.prisma.catSubtipoHabitacional.findMany({
            orderBy: { nombre: 'asc' },
        });
    }

    async getOrigenesProyecto() {
        return this.prisma.catOrigenProyecto.findMany({
            orderBy: { nombre: 'asc' },
        });
    }
}
