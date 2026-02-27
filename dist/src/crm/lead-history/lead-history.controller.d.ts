import { LeadHistoryService } from './lead-history.service';
import { CreateLeadHistoryDto, UpdateLeadHistoryDto } from './dto/create-lead-history.dto';
export declare class LeadHistoryController {
    private readonly leadHistoryService;
    constructor(leadHistoryService: LeadHistoryService);
    create(dto: CreateLeadHistoryDto): Promise<{
        id_lead: number;
        cambiado_en: Date;
        id_etapa: number;
        id_historial: number;
        cambiado_por: number | null;
    }>;
    findAll(leadId?: number): Promise<{
        id_lead: number;
        cambiado_en: Date;
        id_etapa: number;
        id_historial: number;
        cambiado_por: number | null;
    }[]>;
    findOne(id: number): Promise<{
        id_lead: number;
        cambiado_en: Date;
        id_etapa: number;
        id_historial: number;
        cambiado_por: number | null;
    }>;
    update(id: number, dto: UpdateLeadHistoryDto): Promise<{
        id_lead: number;
        cambiado_en: Date;
        id_etapa: number;
        id_historial: number;
        cambiado_por: number | null;
    }>;
    remove(id: number): Promise<{
        id_lead: number;
        cambiado_en: Date;
        id_etapa: number;
        id_historial: number;
        cambiado_por: number | null;
    }>;
}
