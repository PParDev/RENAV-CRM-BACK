import { PrismaService } from '../database/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { CrmLead } from '@prisma/client';
export declare class LeadsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createLeadDto: CreateLeadDto): Promise<CrmLead>;
    findAll(skip?: number, take?: number, estado?: string, usuario?: number, search?: string): Promise<CrmLead[]>;
    findOne(id: number): Promise<CrmLead>;
    update(id: number, updateLeadDto: UpdateLeadDto): Promise<CrmLead>;
    remove(id: number): Promise<CrmLead>;
}
