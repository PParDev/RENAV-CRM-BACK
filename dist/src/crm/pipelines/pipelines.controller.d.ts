import { PipelinesService } from './pipelines.service';
import { CreatePipelineDto, UpdatePipelineDto } from './dto/create-pipeline.dto';
export declare class PipelinesController {
    private readonly pipelinesService;
    constructor(pipelinesService: PipelinesService);
    create(dto: CreatePipelineDto): Promise<{
        id_servicio: number;
        nombre: string;
        activo: boolean;
        id_etapa: number;
        orden: number;
    }>;
    findAll(): Promise<{
        id_servicio: number;
        nombre: string;
        activo: boolean;
        id_etapa: number;
        orden: number;
    }[]>;
    findOne(id: number): Promise<{
        id_servicio: number;
        nombre: string;
        activo: boolean;
        id_etapa: number;
        orden: number;
    }>;
    update(id: number, dto: UpdatePipelineDto): Promise<{
        id_servicio: number;
        nombre: string;
        activo: boolean;
        id_etapa: number;
        orden: number;
    }>;
    remove(id: number): Promise<{
        id_servicio: number;
        nombre: string;
        activo: boolean;
        id_etapa: number;
        orden: number;
    }>;
}
