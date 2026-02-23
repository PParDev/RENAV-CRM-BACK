import { PipelinesService } from './pipelines.service';
import { CreatePipelineDto, UpdatePipelineDto } from './dto/create-pipeline.dto';
export declare class PipelinesController {
    private readonly pipelinesService;
    constructor(pipelinesService: PipelinesService);
    create(dto: CreatePipelineDto): Promise<{
        id_etapa: number;
        id_servicio: number;
        nombre: string;
        orden: number;
        activo: boolean;
    }>;
    findAll(): Promise<{
        id_etapa: number;
        id_servicio: number;
        nombre: string;
        orden: number;
        activo: boolean;
    }[]>;
    findOne(id: number): Promise<{
        id_etapa: number;
        id_servicio: number;
        nombre: string;
        orden: number;
        activo: boolean;
    }>;
    update(id: number, dto: UpdatePipelineDto): Promise<{
        id_etapa: number;
        id_servicio: number;
        nombre: string;
        orden: number;
        activo: boolean;
    }>;
    remove(id: number): Promise<{
        id_etapa: number;
        id_servicio: number;
        nombre: string;
        orden: number;
        activo: boolean;
    }>;
}
