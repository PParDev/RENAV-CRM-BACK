import { LeadServicesService } from './lead-services.service';
import { CreateLeadServiceDto, UpdateLeadServiceDto } from './dto/create-lead-service.dto';
export declare class LeadServicesController {
    private readonly leadServicesService;
    constructor(leadServicesService: LeadServicesService);
    create(dto: CreateLeadServiceDto): Promise<{
        id_servicio: number;
        creado_en: Date;
        id_lead: number;
        id_lead_servicio: number;
        es_principal: boolean;
    }>;
    findAll(leadId?: number): Promise<{
        id_servicio: number;
        creado_en: Date;
        id_lead: number;
        id_lead_servicio: number;
        es_principal: boolean;
    }[]>;
    findOne(id: number): Promise<{
        id_servicio: number;
        creado_en: Date;
        id_lead: number;
        id_lead_servicio: number;
        es_principal: boolean;
    }>;
    update(id: number, dto: UpdateLeadServiceDto): Promise<{
        id_servicio: number;
        creado_en: Date;
        id_lead: number;
        id_lead_servicio: number;
        es_principal: boolean;
    }>;
    remove(id: number): Promise<{
        id_servicio: number;
        creado_en: Date;
        id_lead: number;
        id_lead_servicio: number;
        es_principal: boolean;
    }>;
}
