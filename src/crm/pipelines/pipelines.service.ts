import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreatePipelineDto, UpdatePipelineDto } from './dto/create-pipeline.dto';
import { CrmEtapaPipeline } from '@prisma/client';

@Injectable()
export class PipelinesService {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreatePipelineDto): Promise<CrmEtapaPipeline> {
        return this.prisma.crmEtapaPipeline.create({ data });
    }

    async findAll(): Promise<CrmEtapaPipeline[]> {
        return this.prisma.crmEtapaPipeline.findMany({
            where: { activo: true },
            orderBy: { orden: 'asc' },
            include: { servicio: true }
        });
    }

    async findOne(id: number): Promise<CrmEtapaPipeline> {
        const etapa = await this.prisma.crmEtapaPipeline.findUnique({
            where: { id_etapa: id },
            include: { servicio: true }
        });
        if (!etapa || !etapa.activo) throw new NotFoundException('Pipeline stage not found');
        return etapa;
    }

    async update(id: number, data: UpdatePipelineDto): Promise<CrmEtapaPipeline> {
        try {
            return await this.prisma.crmEtapaPipeline.update({
                where: { id_etapa: id },
                data,
            });
        } catch (error) {
            throw new NotFoundException('Pipeline stage not found');
        }
    }

    async remove(id: number): Promise<CrmEtapaPipeline> {
        try {
            return await this.prisma.crmEtapaPipeline.update({
                where: { id_etapa: id },
                data: { activo: false }
            });
        } catch (error) {
            throw new NotFoundException('Pipeline stage not found');
        }
    }
}
