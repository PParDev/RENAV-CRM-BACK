import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
export declare class LeadsController {
    private readonly leadsService;
    constructor(leadsService: LeadsService);
    create(createLeadDto: CreateLeadDto): Promise<{
        estado: string;
        creado_en: Date;
        actualizado_en: Date;
        id_lead: number;
        id_contacto: number;
        id_servicio_principal: number | null;
        prioridad: string;
        id_usuario_asignado: number | null;
        notas_iniciales: string | null;
    }>;
    findAll(skip?: number, take?: number, estado?: string, usuario?: number, search?: string): Promise<{
        estado: string;
        creado_en: Date;
        actualizado_en: Date;
        id_lead: number;
        id_contacto: number;
        id_servicio_principal: number | null;
        prioridad: string;
        id_usuario_asignado: number | null;
        notas_iniciales: string | null;
    }[]>;
    findOne(id: number): Promise<{
        estado: string;
        creado_en: Date;
        actualizado_en: Date;
        id_lead: number;
        id_contacto: number;
        id_servicio_principal: number | null;
        prioridad: string;
        id_usuario_asignado: number | null;
        notas_iniciales: string | null;
    }>;
    update(id: number, updateLeadDto: UpdateLeadDto): Promise<{
        estado: string;
        creado_en: Date;
        actualizado_en: Date;
        id_lead: number;
        id_contacto: number;
        id_servicio_principal: number | null;
        prioridad: string;
        id_usuario_asignado: number | null;
        notas_iniciales: string | null;
    }>;
    remove(id: number): Promise<{
        estado: string;
        creado_en: Date;
        actualizado_en: Date;
        id_lead: number;
        id_contacto: number;
        id_servicio_principal: number | null;
        prioridad: string;
        id_usuario_asignado: number | null;
        notas_iniciales: string | null;
    }>;
}
