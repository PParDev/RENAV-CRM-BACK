import { PrismaService } from '../../database/prisma.service';
import { CreateTypologyDto } from './dto/create-typology.dto';
import { UpdateTypologyDto } from './dto/update-typology.dto';
import { InvTipologia } from '@prisma/client';
export declare class TypologiesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createTypologyDto: CreateTypologyDto): Promise<InvTipologia>;
    findAll(skip?: number, take?: number, id_desarrollo?: number, search?: string): Promise<InvTipologia[]>;
    findOne(id: number): Promise<InvTipologia>;
    update(id: number, updateTypologyDto: UpdateTypologyDto): Promise<InvTipologia>;
    remove(id: number): Promise<InvTipologia>;
}
