import { LeadServicesService } from './lead-services.service';
import { CreateLeadServiceDto, UpdateLeadServiceDto } from './dto/create-lead-service.dto';
export declare class LeadServicesController {
    private readonly leadServicesService;
    constructor(leadServicesService: LeadServicesService);
    create(dto: CreateLeadServiceDto): Promise<{
        id_servicio: number;
        id_lead: number;
        id_lead_servicio: number;
        es_principal: boolean;
        creado_en: Date;
    }>;
    findAll(leadId?: number): Promise<{
        id_servicio: number;
        id_lead: number;
        id_lead_servicio: number;
        es_principal: boolean;
        creado_en: Date;
    }[]>;
    findOne(id: number): Promise<{
        id_servicio: number;
        id_lead: number;
        id_lead_servicio: number;
        es_principal: boolean;
        creado_en: Date;
    }>;
    update(id: number, dto: UpdateLeadServiceDto): Promise<{
        id_servicio: number;
        id_lead: number;
        id_lead_servicio: number;
        es_principal: boolean;
        creado_en: Date;
    }>;
    remove(id: number): Promise<{
        id_servicio: number;
        id_lead: number;
        id_lead_servicio: number;
        es_principal: boolean;
        creado_en: Date;
    }>;
}
