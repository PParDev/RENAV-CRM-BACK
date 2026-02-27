import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
export declare class LeadsController {
    private readonly leadsService;
    constructor(leadsService: LeadsService);
    create(createLeadDto: CreateLeadDto): Promise<{
        creado_en: Date;
        actualizado_en: Date;
        id_lead: number;
        estado: string;
        id_contacto: number;
        id_servicio_principal: number | null;
        prioridad: string;
        id_usuario_asignado: number | null;
        notas_iniciales: string | null;
    }>;
    findAll(skip?: number, take?: number, estado?: string, usuario?: number, search?: string): Promise<{
        creado_en: Date;
        actualizado_en: Date;
        id_lead: number;
        estado: string;
        id_contacto: number;
        id_servicio_principal: number | null;
        prioridad: string;
        id_usuario_asignado: number | null;
        notas_iniciales: string | null;
    }[]>;
    findOne(id: number): Promise<{
        creado_en: Date;
        actualizado_en: Date;
        id_lead: number;
        estado: string;
        id_contacto: number;
        id_servicio_principal: number | null;
        prioridad: string;
        id_usuario_asignado: number | null;
        notas_iniciales: string | null;
    }>;
    update(id: number, updateLeadDto: UpdateLeadDto): Promise<{
        creado_en: Date;
        actualizado_en: Date;
        id_lead: number;
        estado: string;
        id_contacto: number;
        id_servicio_principal: number | null;
        prioridad: string;
        id_usuario_asignado: number | null;
        notas_iniciales: string | null;
    }>;
    remove(id: number): Promise<{
        creado_en: Date;
        actualizado_en: Date;
        id_lead: number;
        estado: string;
        id_contacto: number;
        id_servicio_principal: number | null;
        prioridad: string;
        id_usuario_asignado: number | null;
        notas_iniciales: string | null;
    }>;
}
