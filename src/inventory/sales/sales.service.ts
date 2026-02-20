
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateApartadoDto } from './dto/create-apartado.dto';
import { CreateVentaDto } from './dto/create-venta.dto';

@Injectable()
export class SalesService {
    constructor(private readonly prisma: PrismaService) { }

    // Registra un nuevo apartado de una unidad para un lead
    async createApartado(createApartadoDto: CreateApartadoDto) {
        const unit = await this.prisma.invUnidad.findUnique({
            where: { id_unidad: createApartadoDto.id_unidad },
        });

        if (!unit) {
            throw new NotFoundException('Unit not found');
        }

        return this.prisma.invApartado.create({
            data: createApartadoDto,
        });
    }

    // Registra la venta de una unidad, validando que no esté vendida previamente
    async createVenta(createVentaDto: CreateVentaDto) {
        // Check if unit exists and is not already sold
        const existingSale = await this.prisma.invVenta.findUnique({
            where: { id_unidad: createVentaDto.id_unidad },
        });

        if (existingSale) {
            throw new BadRequestException('Unit is already sold');
        }

        const unit = await this.prisma.invUnidad.findUnique({
            where: { id_unidad: createVentaDto.id_unidad },
        });

        if (!unit) {
            throw new NotFoundException('Unit not found');
        }

        return this.prisma.invVenta.create({
            data: createVentaDto,
        });
    }

    // Obtiene el historial de apartados realizados
    async findAllApartados(leadId?: number) {
        const where: any = {};
        if (leadId) where.id_lead = leadId;

        return this.prisma.invApartado.findMany({
            where,
            include: { unidad: true, lead: true },
            orderBy: { fecha_apartado: 'desc' },
        });
    }

    // Obtiene el historial de ventas cerradas
    async findAllVentas(leadId?: number) {
        const where: any = {};
        if (leadId) where.id_lead = leadId;

        return this.prisma.invVenta.findMany({
            where,
            include: { unidad: true, lead: true },
            orderBy: { fecha_cierre: 'desc' },
        });
    }
}
