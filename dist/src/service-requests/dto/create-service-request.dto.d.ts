export declare class CreateArquitecturaDto {
    frente_m?: number;
    fondo_m?: number;
    superficie_m2?: number;
    ubicacion?: string;
    zona?: string;
    conoce_compatibilidad_urbanistica?: boolean;
    id_tipo_proyecto?: number;
    id_subtipo_habitacional?: number;
    proyectar_y_construir_inmediato?: boolean;
}
export declare class CreateConstruccionDto {
    tiene_proyecto?: boolean;
    frente_m?: number;
    fondo_m?: number;
    superficie_m2?: number;
    ubicacion?: string;
    zona?: string;
    conoce_compatibilidad_urbanistica?: boolean;
    id_tipo_proyecto?: number;
    id_subtipo_habitacional?: number;
    construccion_inmediata?: boolean;
}
export declare class CreateAvaluoDto {
    tipo_bien?: string;
    ubicacion?: string;
    zona?: string;
    frente_m?: number;
    fondo_m?: number;
    superficie_m2?: number;
    terreno_topografia?: string;
    terreno_forma?: string;
    superficie_construida_m2?: number;
    fecha_visita?: string;
    temporalidad_entrega?: string;
}
export declare class CreateBienesRaicesDto {
    id_tipo_inmueble?: number;
    ciudad?: string;
    zona?: string;
    ubicacion?: string;
    frente_m?: number;
    fondo_m?: number;
    superficie_m2?: number;
    recamaras?: number;
    banos?: number;
    estacionamientos?: number;
    m2_construidos_requeridos?: number;
}
export declare class CreateServiceRequestDto {
    id_lead: number;
    id_servicio: number;
    presupuesto_min?: number;
    presupuesto_max?: number;
    id_metodo_pago?: number;
    ciudad?: string;
    zona?: string;
    ubicacion_texto?: string;
    arquitectura?: CreateArquitecturaDto;
    construccion?: CreateConstruccionDto;
    avaluo?: CreateAvaluoDto;
    bienes_raices?: CreateBienesRaicesDto;
}
