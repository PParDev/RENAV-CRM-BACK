import { PrismaService } from '../../database/prisma.service';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';
export declare class ServiceRequestsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createRequestDto: CreateServiceRequestDto): Promise<{
        id_servicio: number;
        id_metodo_pago: number | null;
        ciudad: string | null;
        creado_en: Date;
        id_lead: number;
        presupuesto_min: import("@prisma/client-runtime-utils").Decimal | null;
        presupuesto_max: import("@prisma/client-runtime-utils").Decimal | null;
        zona: string | null;
        ubicacion_texto: string | null;
        id_solicitud: number;
    }>;
    findAllByLead(leadId: number): Promise<({
        arquitectura: ({
            subtipo_habitacional: {
                codigo: string;
                nombre: string;
                id_subtipo: number;
            } | null;
            tipo_proyecto: {
                codigo: string;
                nombre: string;
                id_tipo_proyecto: number;
            } | null;
        } & {
            id_tipo_proyecto: number | null;
            ubicacion: string | null;
            zona: string | null;
            id_solicitud: number;
            frente_m: import("@prisma/client-runtime-utils").Decimal | null;
            fondo_m: import("@prisma/client-runtime-utils").Decimal | null;
            superficie_m2: import("@prisma/client-runtime-utils").Decimal | null;
            conoce_compatibilidad_urbanistica: boolean | null;
            proyectar_y_construir_inmediato: boolean | null;
            id_subtipo_habitacional: number | null;
        }) | null;
        construccion: ({
            subtipo_habitacional: {
                codigo: string;
                nombre: string;
                id_subtipo: number;
            } | null;
            tipo_proyecto: {
                codigo: string;
                nombre: string;
                id_tipo_proyecto: number;
            } | null;
        } & {
            id_tipo_proyecto: number | null;
            ubicacion: string | null;
            zona: string | null;
            id_solicitud: number;
            frente_m: import("@prisma/client-runtime-utils").Decimal | null;
            fondo_m: import("@prisma/client-runtime-utils").Decimal | null;
            superficie_m2: import("@prisma/client-runtime-utils").Decimal | null;
            conoce_compatibilidad_urbanistica: boolean | null;
            id_subtipo_habitacional: number | null;
            tiene_proyecto: boolean | null;
            construccion_inmediata: boolean | null;
        }) | null;
        avaluo: {
            ubicacion: string | null;
            zona: string | null;
            id_solicitud: number;
            frente_m: import("@prisma/client-runtime-utils").Decimal | null;
            fondo_m: import("@prisma/client-runtime-utils").Decimal | null;
            superficie_m2: import("@prisma/client-runtime-utils").Decimal | null;
            tipo_bien: string | null;
            terreno_topografia: string | null;
            terreno_forma: string | null;
            superficie_construida_m2: import("@prisma/client-runtime-utils").Decimal | null;
            fecha_visita: Date | null;
            temporalidad_entrega: string | null;
        } | null;
        bienes_raices: ({
            tipo_inmueble: {
                codigo: string;
                nombre: string;
                id_tipo_inmueble: number;
            } | null;
        } & {
            id_tipo_inmueble: number | null;
            ubicacion: string | null;
            ciudad: string | null;
            zona: string | null;
            id_solicitud: number;
            frente_m: import("@prisma/client-runtime-utils").Decimal | null;
            fondo_m: import("@prisma/client-runtime-utils").Decimal | null;
            superficie_m2: import("@prisma/client-runtime-utils").Decimal | null;
            recamaras: number | null;
            banos: number | null;
            estacionamientos: number | null;
            m2_construidos_requeridos: import("@prisma/client-runtime-utils").Decimal | null;
        }) | null;
        servicio: {
            id_servicio: number;
            codigo: string;
            nombre: string;
            activo: boolean;
        };
    } & {
        id_servicio: number;
        id_metodo_pago: number | null;
        ciudad: string | null;
        creado_en: Date;
        id_lead: number;
        presupuesto_min: import("@prisma/client-runtime-utils").Decimal | null;
        presupuesto_max: import("@prisma/client-runtime-utils").Decimal | null;
        zona: string | null;
        ubicacion_texto: string | null;
        id_solicitud: number;
    })[]>;
}
