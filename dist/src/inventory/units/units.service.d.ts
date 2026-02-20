import { PrismaService } from '../../database/prisma.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { InvUnidad } from '@prisma/client';
export declare class UnitsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUnitDto: CreateUnitDto): Promise<InvUnidad>;
    findAll(skip?: number, take?: number, desarrolloId?: number, codigo?: string): Promise<InvUnidad[]>;
    findOne(id: number): Promise<InvUnidad>;
    update(id: number, updateUnitDto: UpdateUnitDto): Promise<InvUnidad>;
    remove(id: number): Promise<InvUnidad>;
}
