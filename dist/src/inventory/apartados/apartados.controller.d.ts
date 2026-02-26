import { ApartadosService } from './apartados.service';
import { CreateApartadoDto } from './dto/create-apartado.dto';
import { UpdateApartadoDto } from './dto/update-apartado.dto';
export declare class ApartadosController {
    private readonly apartadosService;
    constructor(apartadosService: ApartadosService);
    create(createApartadoDto: CreateApartadoDto): Promise<{
        id_unidad: number;
        id_lead: number | null;
        monto_apartado: import("@prisma/client-runtime-utils").Decimal | null;
        fecha_apartado: Date | null;
        vence_en: Date | null;
        status: boolean;
        id_apartado: number;
    }>;
    findAll(skip?: string, take?: string, id_unidad?: string, id_lead?: string, status?: string): Promise<{
        id_unidad: number;
        id_lead: number | null;
        monto_apartado: import("@prisma/client-runtime-utils").Decimal | null;
        fecha_apartado: Date | null;
        vence_en: Date | null;
        status: boolean;
        id_apartado: number;
    }[]>;
    findOne(id: number): Promise<{
        id_unidad: number;
        id_lead: number | null;
        monto_apartado: import("@prisma/client-runtime-utils").Decimal | null;
        fecha_apartado: Date | null;
        vence_en: Date | null;
        status: boolean;
        id_apartado: number;
    }>;
    update(id: number, updateApartadoDto: UpdateApartadoDto): Promise<{
        id_unidad: number;
        id_lead: number | null;
        monto_apartado: import("@prisma/client-runtime-utils").Decimal | null;
        fecha_apartado: Date | null;
        vence_en: Date | null;
        status: boolean;
        id_apartado: number;
    }>;
    remove(id: number): Promise<{
        id_unidad: number;
        id_lead: number | null;
        monto_apartado: import("@prisma/client-runtime-utils").Decimal | null;
        fecha_apartado: Date | null;
        vence_en: Date | null;
        status: boolean;
        id_apartado: number;
    }>;
}
