import { PipelinesService } from './pipelines.service';
import { CreatePipelineDto, UpdatePipelineDto } from './dto/create-pipeline.dto';
export declare class PipelinesController {
    private readonly pipelinesService;
    constructor(pipelinesService: PipelinesService);
    create(dto: CreatePipelineDto): Promise<{
        nombre: string;
        activo: boolean;
        id_servicio: number;
        orden: number;
        id_etapa: number;
    }>;
    findAll(): Promise<{
        nombre: string;
        activo: boolean;
        id_servicio: number;
        orden: number;
        id_etapa: number;
    }[]>;
    findOne(id: number): Promise<{
        nombre: string;
        activo: boolean;
        id_servicio: number;
        orden: number;
        id_etapa: number;
    }>;
    update(id: number, dto: UpdatePipelineDto): Promise<{
        nombre: string;
        activo: boolean;
        id_servicio: number;
        orden: number;
        id_etapa: number;
    }>;
    remove(id: number): Promise<{
        nombre: string;
        activo: boolean;
        id_servicio: number;
        orden: number;
        id_etapa: number;
    }>;
}
