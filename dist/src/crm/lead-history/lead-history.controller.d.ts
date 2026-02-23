import { LeadHistoryService } from './lead-history.service';
import { CreateLeadHistoryDto, UpdateLeadHistoryDto } from './dto/create-lead-history.dto';
export declare class LeadHistoryController {
    private readonly leadHistoryService;
    constructor(leadHistoryService: LeadHistoryService);
    create(dto: CreateLeadHistoryDto): Promise<{
        id_etapa: number;
        id_historial: number;
        id_lead: number;
        cambiado_por: number | null;
        cambiado_en: Date;
    }>;
    findAll(leadId?: number): Promise<{
        id_etapa: number;
        id_historial: number;
        id_lead: number;
        cambiado_por: number | null;
        cambiado_en: Date;
    }[]>;
    findOne(id: number): Promise<{
        id_etapa: number;
        id_historial: number;
        id_lead: number;
        cambiado_por: number | null;
        cambiado_en: Date;
    }>;
    update(id: number, dto: UpdateLeadHistoryDto): Promise<{
        id_etapa: number;
        id_historial: number;
        id_lead: number;
        cambiado_por: number | null;
        cambiado_en: Date;
    }>;
    remove(id: number): Promise<{
        id_etapa: number;
        id_historial: number;
        id_lead: number;
        cambiado_por: number | null;
        cambiado_en: Date;
    }>;
}
