import { PrismaService } from '../database/prisma.service';
import { CreateBaseCatalogDto, UpdateBaseCatalogDto, CreateServicioDto, UpdateServicioDto, CreateTipoPropiedadDto, UpdateTipoPropiedadDto } from './dto/catalog.dto';
export declare class CatalogsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getServicios(): Promise<{
        id_servicio: number;
        codigo: string;
        nombre: string;
        activo: boolean;
    }[]>;
    createServicio(data: CreateServicioDto): Promise<{
        id_servicio: number;
        codigo: string;
        nombre: string;
        activo: boolean;
    }>;
    updateServicio(id: number, data: UpdateServicioDto): Promise<{
        id_servicio: number;
        codigo: string;
        nombre: string;
        activo: boolean;
    }>;
    deleteServicio(id: number): Promise<{
        id_servicio: number;
        codigo: string;
        nombre: string;
        activo: boolean;
    }>;
    getMetodosPago(): Promise<{
        codigo: string;
        nombre: string;
        id_metodo_pago: number;
    }[]>;
    createMetodoPago(data: CreateBaseCatalogDto): Promise<{
        codigo: string;
        nombre: string;
        id_metodo_pago: number;
    }>;
    updateMetodoPago(id: number, data: UpdateBaseCatalogDto): Promise<{
        codigo: string;
        nombre: string;
        id_metodo_pago: number;
    }>;
    deleteMetodoPago(id: number): Promise<{
        codigo: string;
        nombre: string;
        id_metodo_pago: number;
    }>;
    getTiposInmueble(): Promise<{
        codigo: string;
        nombre: string;
        id_tipo_inmueble: number;
    }[]>;
    createTipoInmueble(data: CreateBaseCatalogDto): Promise<{
        codigo: string;
        nombre: string;
        id_tipo_inmueble: number;
    }>;
    updateTipoInmueble(id: number, data: UpdateBaseCatalogDto): Promise<{
        codigo: string;
        nombre: string;
        id_tipo_inmueble: number;
    }>;
    deleteTipoInmueble(id: number): Promise<{
        codigo: string;
        nombre: string;
        id_tipo_inmueble: number;
    }>;
    getTiposProyecto(): Promise<{
        codigo: string;
        nombre: string;
        id_tipo_proyecto: number;
    }[]>;
    createTipoProyecto(data: CreateBaseCatalogDto): Promise<{
        codigo: string;
        nombre: string;
        id_tipo_proyecto: number;
    }>;
    updateTipoProyecto(id: number, data: UpdateBaseCatalogDto): Promise<{
        codigo: string;
        nombre: string;
        id_tipo_proyecto: number;
    }>;
    deleteTipoProyecto(id: number): Promise<{
        codigo: string;
        nombre: string;
        id_tipo_proyecto: number;
    }>;
    getSubtiposHabitacional(): Promise<{
        codigo: string;
        nombre: string;
        id_subtipo: number;
    }[]>;
    createSubtipoHabitacional(data: CreateBaseCatalogDto): Promise<{
        codigo: string;
        nombre: string;
        id_subtipo: number;
    }>;
    updateSubtipoHabitacional(id: number, data: UpdateBaseCatalogDto): Promise<{
        codigo: string;
        nombre: string;
        id_subtipo: number;
    }>;
    deleteSubtipoHabitacional(id: number): Promise<{
        codigo: string;
        nombre: string;
        id_subtipo: number;
    }>;
    getOrigenesProyecto(): Promise<{
        codigo: string;
        nombre: string;
        id_origen_proyecto: number;
    }[]>;
    createOrigenProyecto(data: CreateBaseCatalogDto): Promise<{
        codigo: string;
        nombre: string;
        id_origen_proyecto: number;
    }>;
    updateOrigenProyecto(id: number, data: UpdateBaseCatalogDto): Promise<{
        codigo: string;
        nombre: string;
        id_origen_proyecto: number;
    }>;
    deleteOrigenProyecto(id: number): Promise<{
        codigo: string;
        nombre: string;
        id_origen_proyecto: number;
    }>;
    getEstadosUnidad(): Promise<{
        codigo: string;
        nombre: string;
        id_estado_unidad: number;
    }[]>;
    createEstadoUnidad(data: CreateBaseCatalogDto): Promise<{
        codigo: string;
        nombre: string;
        id_estado_unidad: number;
    }>;
    updateEstadoUnidad(id: number, data: UpdateBaseCatalogDto): Promise<{
        codigo: string;
        nombre: string;
        id_estado_unidad: number;
    }>;
    deleteEstadoUnidad(id: number): Promise<{
        codigo: string;
        nombre: string;
        id_estado_unidad: number;
    }>;
    getEstadosRelacionDesarrollador(): Promise<{
        codigo: string;
        nombre: string;
        id_estado: number;
    }[]>;
    createEstadoRelacionDesarrollador(data: CreateBaseCatalogDto): Promise<{
        codigo: string;
        nombre: string;
        id_estado: number;
    }>;
    updateEstadoRelacionDesarrollador(id: number, data: UpdateBaseCatalogDto): Promise<{
        codigo: string;
        nombre: string;
        id_estado: number;
    }>;
    deleteEstadoRelacionDesarrollador(id: number): Promise<{
        codigo: string;
        nombre: string;
        id_estado: number;
    }>;
    getNivelesCertezaLegal(): Promise<{
        codigo: string;
        nombre: string;
        id_nivel: number;
    }[]>;
    createNivelCertezaLegal(data: CreateBaseCatalogDto): Promise<{
        codigo: string;
        nombre: string;
        id_nivel: number;
    }>;
    updateNivelCertezaLegal(id: number, data: UpdateBaseCatalogDto): Promise<{
        codigo: string;
        nombre: string;
        id_nivel: number;
    }>;
    deleteNivelCertezaLegal(id: number): Promise<{
        codigo: string;
        nombre: string;
        id_nivel: number;
    }>;
    getEstadosDocumentacion(): Promise<{
        codigo: string;
        nombre: string;
        id_estado_doc: number;
    }[]>;
    createEstadoDocumentacion(data: CreateBaseCatalogDto): Promise<{
        codigo: string;
        nombre: string;
        id_estado_doc: number;
    }>;
    updateEstadoDocumentacion(id: number, data: UpdateBaseCatalogDto): Promise<{
        codigo: string;
        nombre: string;
        id_estado_doc: number;
    }>;
    deleteEstadoDocumentacion(id: number): Promise<{
        codigo: string;
        nombre: string;
        id_estado_doc: number;
    }>;
    getTiposPropiedad(): Promise<{
        id_tipo_propiedad: number;
        tenencia: string | null;
        uso: string | null;
        tipologia: string | null;
        descripcion: string | null;
    }[]>;
    createTipoPropiedad(data: CreateTipoPropiedadDto): Promise<{
        id_tipo_propiedad: number;
        tenencia: string | null;
        uso: string | null;
        tipologia: string | null;
        descripcion: string | null;
    }>;
    updateTipoPropiedad(id: number, data: UpdateTipoPropiedadDto): Promise<{
        id_tipo_propiedad: number;
        tenencia: string | null;
        uso: string | null;
        tipologia: string | null;
        descripcion: string | null;
    }>;
    deleteTipoPropiedad(id: number): Promise<{
        id_tipo_propiedad: number;
        tenencia: string | null;
        uso: string | null;
        tipologia: string | null;
        descripcion: string | null;
    }>;
}
