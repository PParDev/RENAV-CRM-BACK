import { PrismaService } from '../database/prisma.service';
export declare class CatalogsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getServicios(): Promise<{
        nombre: string;
        id_servicio: number;
        codigo: string;
        activo: boolean;
    }[]>;
    getMetodosPago(): Promise<{
        nombre: string;
        codigo: string;
        id_metodo_pago: number;
    }[]>;
    getTiposInmueble(): Promise<{
        nombre: string;
        codigo: string;
        id_tipo_inmueble: number;
    }[]>;
    getTiposProyecto(): Promise<{
        nombre: string;
        codigo: string;
        id_tipo_proyecto: number;
    }[]>;
    getSubtiposHabitacional(): Promise<{
        nombre: string;
        codigo: string;
        id_subtipo: number;
    }[]>;
    getOrigenesProyecto(): Promise<{
        nombre: string;
        codigo: string;
        id_origen_proyecto: number;
    }[]>;
    getEstadosUnidad(): Promise<{
        nombre: string;
        codigo: string;
        id_estado_unidad: number;
    }[]>;
    getEstadosRelacionDesarrollador(): Promise<{
        nombre: string;
        codigo: string;
        id_estado: number;
    }[]>;
    getNivelesCertezaLegal(): Promise<{
        nombre: string;
        codigo: string;
        id_nivel: number;
    }[]>;
    getEstadosDocumentacion(): Promise<{
        nombre: string;
        codigo: string;
        id_estado_doc: number;
    }[]>;
    getTiposPropiedad(): Promise<{
        id_tipo_propiedad: number;
        tenencia: string | null;
        uso: string | null;
        tipologia: string | null;
        descripcion: string | null;
    }[]>;
    getCiudades(): Promise<{
        estado: string | null;
        nombre: string;
        codigo: string | null;
        id_inv_ciudad: number;
    }[]>;
}
