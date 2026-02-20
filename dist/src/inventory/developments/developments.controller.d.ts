import { DevelopmentsService } from './developments.service';
import { CreateDevelopmentDto } from './dto/create-development.dto';
import { UpdateDevelopmentDto } from './dto/update-development.dto';
import { CreateTypologyDto } from './dto/create-typology.dto';
export declare class DevelopmentsController {
    private readonly developmentsService;
    constructor(developmentsService: DevelopmentsService);
    create(createDevelopmentDto: CreateDevelopmentDto): Promise<{
        creado_en: Date;
        actualizado_en: Date;
        nombre: string;
        ciudad: number | null;
        id_origen_proyecto: number | null;
        id_desarrollador: number | null;
        id_estado_relac_des: number | null;
        nivel_certeza_legal: number | null;
        cat_estado_doc: number | null;
        porcentaje_comision: import("@prisma/client-runtime-utils").Decimal | null;
        id_desarrollo: number;
    }>;
    addTypology(id: number, createTypologyDto: CreateTypologyDto): Promise<{
        nombre: string;
        total_unidades: number | null;
        id_desarrollo: number;
        id_tipologia: number;
    }>;
    findAll(skip?: number, take?: number, ciudad?: number, desarrollador?: number, search?: string): Promise<{
        creado_en: Date;
        actualizado_en: Date;
        nombre: string;
        ciudad: number | null;
        id_origen_proyecto: number | null;
        id_desarrollador: number | null;
        id_estado_relac_des: number | null;
        nivel_certeza_legal: number | null;
        cat_estado_doc: number | null;
        porcentaje_comision: import("@prisma/client-runtime-utils").Decimal | null;
        id_desarrollo: number;
    }[]>;
    findOne(id: number): Promise<{
        creado_en: Date;
        actualizado_en: Date;
        nombre: string;
        ciudad: number | null;
        id_origen_proyecto: number | null;
        id_desarrollador: number | null;
        id_estado_relac_des: number | null;
        nivel_certeza_legal: number | null;
        cat_estado_doc: number | null;
        porcentaje_comision: import("@prisma/client-runtime-utils").Decimal | null;
        id_desarrollo: number;
    }>;
    update(id: number, updateDevelopmentDto: UpdateDevelopmentDto): Promise<{
        creado_en: Date;
        actualizado_en: Date;
        nombre: string;
        ciudad: number | null;
        id_origen_proyecto: number | null;
        id_desarrollador: number | null;
        id_estado_relac_des: number | null;
        nivel_certeza_legal: number | null;
        cat_estado_doc: number | null;
        porcentaje_comision: import("@prisma/client-runtime-utils").Decimal | null;
        id_desarrollo: number;
    }>;
    remove(id: number): Promise<{
        creado_en: Date;
        actualizado_en: Date;
        nombre: string;
        ciudad: number | null;
        id_origen_proyecto: number | null;
        id_desarrollador: number | null;
        id_estado_relac_des: number | null;
        nivel_certeza_legal: number | null;
        cat_estado_doc: number | null;
        porcentaje_comision: import("@prisma/client-runtime-utils").Decimal | null;
        id_desarrollo: number;
    }>;
}
