import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
export declare class ActivitiesController {
    private readonly activitiesService;
    constructor(activitiesService: ActivitiesService);
    create(createActivityDto: CreateActivityDto): Promise<{
        descripcion: string | null;
        id_lead: number;
        creada_en: Date;
        id_actividad: number;
        tipo: string;
        programada_para: Date | null;
        realizada_en: Date | null;
        creada_por: number | null;
    }>;
    findAll(leadId?: number): Promise<{
        descripcion: string | null;
        id_lead: number;
        creada_en: Date;
        id_actividad: number;
        tipo: string;
        programada_para: Date | null;
        realizada_en: Date | null;
        creada_por: number | null;
    }[]>;
    findOne(id: number): Promise<{
        descripcion: string | null;
        id_lead: number;
        creada_en: Date;
        id_actividad: number;
        tipo: string;
        programada_para: Date | null;
        realizada_en: Date | null;
        creada_por: number | null;
    }>;
    update(id: number, updateActivityDto: UpdateActivityDto): Promise<{
        descripcion: string | null;
        id_lead: number;
        creada_en: Date;
        id_actividad: number;
        tipo: string;
        programada_para: Date | null;
        realizada_en: Date | null;
        creada_por: number | null;
    }>;
    remove(id: number): Promise<{
        descripcion: string | null;
        id_lead: number;
        creada_en: Date;
        id_actividad: number;
        tipo: string;
        programada_para: Date | null;
        realizada_en: Date | null;
        creada_por: number | null;
    }>;
}
