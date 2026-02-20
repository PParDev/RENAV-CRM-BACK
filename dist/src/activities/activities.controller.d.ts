import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
export declare class ActivitiesController {
    private readonly activitiesService;
    constructor(activitiesService: ActivitiesService);
    create(createActivityDto: CreateActivityDto): Promise<{
        id_lead: number;
        creada_en: Date;
        descripcion: string | null;
        tipo: string;
        programada_para: Date | null;
        creada_por: number | null;
        id_actividad: number;
        realizada_en: Date | null;
    }>;
    findAll(leadId?: number): Promise<{
        id_lead: number;
        creada_en: Date;
        descripcion: string | null;
        tipo: string;
        programada_para: Date | null;
        creada_por: number | null;
        id_actividad: number;
        realizada_en: Date | null;
    }[]>;
    findOne(id: number): Promise<{
        id_lead: number;
        creada_en: Date;
        descripcion: string | null;
        tipo: string;
        programada_para: Date | null;
        creada_por: number | null;
        id_actividad: number;
        realizada_en: Date | null;
    }>;
    update(id: number, updateActivityDto: UpdateActivityDto): Promise<{
        id_lead: number;
        creada_en: Date;
        descripcion: string | null;
        tipo: string;
        programada_para: Date | null;
        creada_por: number | null;
        id_actividad: number;
        realizada_en: Date | null;
    }>;
    remove(id: number): Promise<{
        id_lead: number;
        creada_en: Date;
        descripcion: string | null;
        tipo: string;
        programada_para: Date | null;
        creada_por: number | null;
        id_actividad: number;
        realizada_en: Date | null;
    }>;
}
