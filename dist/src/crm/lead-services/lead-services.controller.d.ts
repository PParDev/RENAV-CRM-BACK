import { LeadServicesService } from './lead-services.service';
import { CreateLeadServiceDto, UpdateLeadServiceDto } from './dto/create-lead-service.dto';
export declare class LeadServicesController {
    private readonly leadServicesService;
    constructor(leadServicesService: LeadServicesService);
    create(dto: CreateLeadServiceDto): Promise<{
        id_servicio: number;
        creado_en: Date;
        id_lead: number;
        es_principal: boolean;
        id_lead_servicio: number;
    }>;
    findAll(leadId?: number): Promise<{
        id_servicio: number;
        creado_en: Date;
        id_lead: number;
        es_principal: boolean;
        id_lead_servicio: number;
    }[]>;
    findOne(id: number): Promise<{
        id_servicio: number;
        creado_en: Date;
        id_lead: number;
        es_principal: boolean;
        id_lead_servicio: number;
    }>;
    update(id: number, dto: UpdateLeadServiceDto): Promise<{
        id_servicio: number;
        creado_en: Date;
        id_lead: number;
        es_principal: boolean;
        id_lead_servicio: number;
    }>;
    remove(id: number): Promise<{
        id_servicio: number;
        creado_en: Date;
        id_lead: number;
        es_principal: boolean;
        id_lead_servicio: number;
    }>;
}
