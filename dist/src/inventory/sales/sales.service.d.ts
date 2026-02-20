import { PrismaService } from '../../database/prisma.service';
import { CreateApartadoDto } from './dto/create-apartado.dto';
import { CreateVentaDto } from './dto/create-venta.dto';
export declare class SalesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createApartado(createApartadoDto: CreateApartadoDto): Promise<{
        id_lead: number | null;
        id_unidad: number;
        monto_apartado: import("@prisma/client-runtime-utils").Decimal | null;
        fecha_apartado: Date | null;
        vence_en: Date | null;
        status: boolean;
        id_apartado: number;
    }>;
    createVenta(createVentaDto: CreateVentaDto): Promise<{
        id_lead: number | null;
        id_unidad: number;
        precio_cierre: import("@prisma/client-runtime-utils").Decimal | null;
        fecha_cierre: Date | null;
        porc_comision: import("@prisma/client-runtime-utils").Decimal | null;
        monto_comision: import("@prisma/client-runtime-utils").Decimal | null;
        id_venta: number;
    }>;
    findAllApartados(leadId?: number): Promise<({
        lead: {
            id_contacto: number;
            id_servicio_principal: number | null;
            estado: string;
            prioridad: string;
            id_usuario_asignado: number | null;
            notas_iniciales: string | null;
            id_lead: number;
            creado_en: Date;
            actualizado_en: Date;
        } | null;
        unidad: {
            id_tipo_inmueble: number | null;
            id_estado_unidad: number | null;
            id_tipo_propiedad: number | null;
            descripcion: string | null;
            id_desarrollo: number;
            id_tipologia: number | null;
            id_unidad: number;
            codigo_unidad: string | null;
            direccion: string | null;
            m2_terreno: import("@prisma/client-runtime-utils").Decimal | null;
            m2_construccion: import("@prisma/client-runtime-utils").Decimal | null;
            moneda: string | null;
            precios_lista: import("@prisma/client-runtime-utils").Decimal | null;
            creado_actualizado_en: Date;
            fecha_obtencion: Date | null;
            fecha_terminacion: Date | null;
        };
    } & {
        id_lead: number | null;
        id_unidad: number;
        monto_apartado: import("@prisma/client-runtime-utils").Decimal | null;
        fecha_apartado: Date | null;
        vence_en: Date | null;
        status: boolean;
        id_apartado: number;
    })[]>;
    findAllVentas(leadId?: number): Promise<({
        lead: {
            id_contacto: number;
            id_servicio_principal: number | null;
            estado: string;
            prioridad: string;
            id_usuario_asignado: number | null;
            notas_iniciales: string | null;
            id_lead: number;
            creado_en: Date;
            actualizado_en: Date;
        } | null;
        unidad: {
            id_tipo_inmueble: number | null;
            id_estado_unidad: number | null;
            id_tipo_propiedad: number | null;
            descripcion: string | null;
            id_desarrollo: number;
            id_tipologia: number | null;
            id_unidad: number;
            codigo_unidad: string | null;
            direccion: string | null;
            m2_terreno: import("@prisma/client-runtime-utils").Decimal | null;
            m2_construccion: import("@prisma/client-runtime-utils").Decimal | null;
            moneda: string | null;
            precios_lista: import("@prisma/client-runtime-utils").Decimal | null;
            creado_actualizado_en: Date;
            fecha_obtencion: Date | null;
            fecha_terminacion: Date | null;
        };
    } & {
        id_lead: number | null;
        id_unidad: number;
        precio_cierre: import("@prisma/client-runtime-utils").Decimal | null;
        fecha_cierre: Date | null;
        porc_comision: import("@prisma/client-runtime-utils").Decimal | null;
        monto_comision: import("@prisma/client-runtime-utils").Decimal | null;
        id_venta: number;
    })[]>;
}
