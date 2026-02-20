import { ServiceRequestsService } from './service-requests.service';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';
export declare class ServiceRequestsController {
    private readonly serviceRequestsService;
    constructor(serviceRequestsService: ServiceRequestsService);
    create(createRequestDto: CreateServiceRequestDto): Promise<{
        id_lead: number;
        creado_en: Date;
        ciudad: string | null;
        id_servicio: number;
        id_metodo_pago: number | null;
        zona: string | null;
        presupuesto_min: import("@prisma/client-runtime-utils").Decimal | null;
        presupuesto_max: import("@prisma/client-runtime-utils").Decimal | null;
        ubicacion_texto: string | null;
        id_solicitud: number;
    }>;
    findAllByLead(leadId: number): Promise<({
        arquitectura: ({
            subtipo_habitacional: {
                nombre: string;
                codigo: string;
                id_subtipo: number;
            } | null;
            tipo_proyecto: {
                nombre: string;
                codigo: string;
                id_tipo_proyecto: number;
            } | null;
        } & {
            id_tipo_proyecto: number | null;
            frente_m: import("@prisma/client-runtime-utils").Decimal | null;
            fondo_m: import("@prisma/client-runtime-utils").Decimal | null;
            superficie_m2: import("@prisma/client-runtime-utils").Decimal | null;
            ubicacion: string | null;
            zona: string | null;
            conoce_compatibilidad_urbanistica: boolean | null;
            id_subtipo_habitacional: number | null;
            proyectar_y_construir_inmediato: boolean | null;
            id_solicitud: number;
        }) | null;
        construccion: ({
            subtipo_habitacional: {
                nombre: string;
                codigo: string;
                id_subtipo: number;
            } | null;
            tipo_proyecto: {
                nombre: string;
                codigo: string;
                id_tipo_proyecto: number;
            } | null;
        } & {
            id_tipo_proyecto: number | null;
            frente_m: import("@prisma/client-runtime-utils").Decimal | null;
            fondo_m: import("@prisma/client-runtime-utils").Decimal | null;
            superficie_m2: import("@prisma/client-runtime-utils").Decimal | null;
            ubicacion: string | null;
            zona: string | null;
            conoce_compatibilidad_urbanistica: boolean | null;
            id_subtipo_habitacional: number | null;
            tiene_proyecto: boolean | null;
            construccion_inmediata: boolean | null;
            id_solicitud: number;
        }) | null;
        avaluo: {
            frente_m: import("@prisma/client-runtime-utils").Decimal | null;
            fondo_m: import("@prisma/client-runtime-utils").Decimal | null;
            superficie_m2: import("@prisma/client-runtime-utils").Decimal | null;
            ubicacion: string | null;
            zona: string | null;
            tipo_bien: string | null;
            terreno_topografia: string | null;
            terreno_forma: string | null;
            superficie_construida_m2: import("@prisma/client-runtime-utils").Decimal | null;
            fecha_visita: Date | null;
            temporalidad_entrega: string | null;
            id_solicitud: number;
        } | null;
        bienes_raices: ({
            tipo_inmueble: {
                nombre: string;
                codigo: string;
                id_tipo_inmueble: number;
            } | null;
        } & {
            ciudad: string | null;
            id_tipo_inmueble: number | null;
            frente_m: import("@prisma/client-runtime-utils").Decimal | null;
            fondo_m: import("@prisma/client-runtime-utils").Decimal | null;
            superficie_m2: import("@prisma/client-runtime-utils").Decimal | null;
            ubicacion: string | null;
            zona: string | null;
            recamaras: number | null;
            banos: number | null;
            estacionamientos: number | null;
            m2_construidos_requeridos: import("@prisma/client-runtime-utils").Decimal | null;
            id_solicitud: number;
        }) | null;
        servicio: {
            nombre: string;
            id_servicio: number;
            codigo: string;
            activo: boolean;
        };
    } & {
        id_lead: number;
        creado_en: Date;
        ciudad: string | null;
        id_servicio: number;
        id_metodo_pago: number | null;
        zona: string | null;
        presupuesto_min: import("@prisma/client-runtime-utils").Decimal | null;
        presupuesto_max: import("@prisma/client-runtime-utils").Decimal | null;
        ubicacion_texto: string | null;
        id_solicitud: number;
    })[]>;
}
