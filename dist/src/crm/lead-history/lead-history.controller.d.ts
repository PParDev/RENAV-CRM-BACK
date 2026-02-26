import { LeadHistoryService } from './lead-history.service';
import { CreateLeadHistoryDto, UpdateLeadHistoryDto } from './dto/create-lead-history.dto';
export declare class LeadHistoryController {
    private readonly leadHistoryService;
    constructor(leadHistoryService: LeadHistoryService);
    create(dto: CreateLeadHistoryDto): Promise<{
        id_lead: number;
        cambiado_en: Date;
        id_etapa: number;
        cambiado_por: number | null;
        id_historial: number;
    }>;
    findAll(leadId?: number): Promise<{
        id_lead: number;
        cambiado_en: Date;
        id_etapa: number;
        cambiado_por: number | null;
        id_historial: number;
    }[]>;
    findOne(id: number): Promise<{
        id_lead: number;
        cambiado_en: Date;
        id_etapa: number;
        cambiado_por: number | null;
        id_historial: number;
    }>;
    update(id: number, dto: UpdateLeadHistoryDto): Promise<{
        id_lead: number;
        cambiado_en: Date;
        id_etapa: number;
        cambiado_por: number | null;
        id_historial: number;
    }>;
    remove(id: number): Promise<{
        id_lead: number;
        cambiado_en: Date;
        id_etapa: number;
        cambiado_por: number | null;
        id_historial: number;
    }>;
}
