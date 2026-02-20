import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
export declare class LeadsController {
    private readonly leadsService;
    constructor(leadsService: LeadsService);
    create(createLeadDto: CreateLeadDto): Promise<{
        id_contacto: number;
        id_servicio_principal: number | null;
        estado: string;
        prioridad: string;
        id_usuario_asignado: number | null;
        notas_iniciales: string | null;
        id_lead: number;
        creado_en: Date;
        actualizado_en: Date;
    }>;
    findAll(skip?: number, take?: number, estado?: string, usuario?: number, search?: string): Promise<{
        id_contacto: number;
        id_servicio_principal: number | null;
        estado: string;
        prioridad: string;
        id_usuario_asignado: number | null;
        notas_iniciales: string | null;
        id_lead: number;
        creado_en: Date;
        actualizado_en: Date;
    }[]>;
    findOne(id: number): Promise<{
        id_contacto: number;
        id_servicio_principal: number | null;
        estado: string;
        prioridad: string;
        id_usuario_asignado: number | null;
        notas_iniciales: string | null;
        id_lead: number;
        creado_en: Date;
        actualizado_en: Date;
    }>;
    update(id: number, updateLeadDto: UpdateLeadDto): Promise<{
        id_contacto: number;
        id_servicio_principal: number | null;
        estado: string;
        prioridad: string;
        id_usuario_asignado: number | null;
        notas_iniciales: string | null;
        id_lead: number;
        creado_en: Date;
        actualizado_en: Date;
    }>;
    remove(id: number): Promise<{
        id_contacto: number;
        id_servicio_principal: number | null;
        estado: string;
        prioridad: string;
        id_usuario_asignado: number | null;
        notas_iniciales: string | null;
        id_lead: number;
        creado_en: Date;
        actualizado_en: Date;
    }>;
}
