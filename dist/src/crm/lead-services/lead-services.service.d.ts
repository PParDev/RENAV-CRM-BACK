import { PrismaService } from '../../database/prisma.service';
import { CreateLeadServiceDto, UpdateLeadServiceDto } from './dto/create-lead-service.dto';
import { CrmLeadServicio } from '@prisma/client';
export declare class LeadServicesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateLeadServiceDto): Promise<CrmLeadServicio>;
    findAll(leadId?: number): Promise<CrmLeadServicio[]>;
    findOne(id: number): Promise<CrmLeadServicio>;
    update(id: number, data: UpdateLeadServiceDto): Promise<CrmLeadServicio>;
    remove(id: number): Promise<CrmLeadServicio>;
}
