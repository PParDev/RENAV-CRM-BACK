import { PrismaService } from '../../database/prisma.service';
import { CreateLeadHistoryDto, UpdateLeadHistoryDto } from './dto/create-lead-history.dto';
import { CrmHistorialEtapaLead } from '@prisma/client';
export declare class LeadHistoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateLeadHistoryDto): Promise<CrmHistorialEtapaLead>;
    findAll(leadId?: number): Promise<CrmHistorialEtapaLead[]>;
    findOne(id: number): Promise<CrmHistorialEtapaLead>;
    update(id: number, data: UpdateLeadHistoryDto): Promise<CrmHistorialEtapaLead>;
    remove(id: number): Promise<CrmHistorialEtapaLead>;
}
