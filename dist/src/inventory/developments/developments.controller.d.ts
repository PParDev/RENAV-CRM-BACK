import { DevelopmentsService } from './developments.service';
import { CreateDevelopmentDto } from './dto/create-development.dto';
import { UpdateDevelopmentDto } from './dto/update-development.dto';
import { CreateTypologyDto } from './dto/create-typology.dto';
export declare class DevelopmentsController {
    private readonly developmentsService;
    constructor(developmentsService: DevelopmentsService);
    create(createDevelopmentDto: CreateDevelopmentDto): Promise<{
        nombre: string;
        id_origen_proyecto: number | null;
        id_desarrollador: number | null;
        ciudad: number | null;
        id_estado_relac_des: number | null;
        nivel_certeza_legal: number | null;
        cat_estado_doc: number | null;
        porcentaje_comision: import("@prisma/client-runtime-utils").Decimal | null;
        id_desarrollo: number;
        creado_en: Date;
        actualizado_en: Date;
    }>;
    addTypology(id: number, createTypologyDto: CreateTypologyDto): Promise<{
        nombre: string;
        total_unidades: number | null;
        id_desarrollo: number;
        id_tipologia: number;
    }>;
    findAll(skip?: number, take?: number, ciudad?: number, desarrollador?: number, search?: string): Promise<{
        nombre: string;
        id_origen_proyecto: number | null;
        id_desarrollador: number | null;
        ciudad: number | null;
        id_estado_relac_des: number | null;
        nivel_certeza_legal: number | null;
        cat_estado_doc: number | null;
        porcentaje_comision: import("@prisma/client-runtime-utils").Decimal | null;
        id_desarrollo: number;
        creado_en: Date;
        actualizado_en: Date;
    }[]>;
    findOne(id: number): Promise<{
        nombre: string;
        id_origen_proyecto: number | null;
        id_desarrollador: number | null;
        ciudad: number | null;
        id_estado_relac_des: number | null;
        nivel_certeza_legal: number | null;
        cat_estado_doc: number | null;
        porcentaje_comision: import("@prisma/client-runtime-utils").Decimal | null;
        id_desarrollo: number;
        creado_en: Date;
        actualizado_en: Date;
    }>;
    update(id: number, updateDevelopmentDto: UpdateDevelopmentDto): Promise<{
        nombre: string;
        id_origen_proyecto: number | null;
        id_desarrollador: number | null;
        ciudad: number | null;
        id_estado_relac_des: number | null;
        nivel_certeza_legal: number | null;
        cat_estado_doc: number | null;
        porcentaje_comision: import("@prisma/client-runtime-utils").Decimal | null;
        id_desarrollo: number;
        creado_en: Date;
        actualizado_en: Date;
    }>;
    remove(id: number): Promise<{
        nombre: string;
        id_origen_proyecto: number | null;
        id_desarrollador: number | null;
        ciudad: number | null;
        id_estado_relac_des: number | null;
        nivel_certeza_legal: number | null;
        cat_estado_doc: number | null;
        porcentaje_comision: import("@prisma/client-runtime-utils").Decimal | null;
        id_desarrollo: number;
        creado_en: Date;
        actualizado_en: Date;
    }>;
}
