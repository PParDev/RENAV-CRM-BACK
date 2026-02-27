import { PrismaService } from '../../database/prisma.service';
import { CreateDevelopmentDto } from './dto/create-development.dto';
import { UpdateDevelopmentDto } from './dto/update-development.dto';
import { CreateTypologyDto } from './dto/create-typology.dto';
import { InvDesarrollo } from '@prisma/client';
export declare class DevelopmentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDevelopmentDto: CreateDevelopmentDto): Promise<InvDesarrollo>;
    addTypology(desarrolloId: number, dto: CreateTypologyDto): Promise<{
        nombre: string;
        id_desarrollo: number;
        total_unidades: number | null;
        id_tipologia: number;
    }>;
    findAll(skip?: number, take?: number, ciudad?: number, desarrollador?: number, search?: string): Promise<InvDesarrollo[]>;
    findOne(id: number): Promise<InvDesarrollo>;
    update(id: number, updateDevelopmentDto: UpdateDevelopmentDto): Promise<InvDesarrollo>;
    remove(id: number): Promise<InvDesarrollo>;
}
