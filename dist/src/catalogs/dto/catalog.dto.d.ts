export declare class CreateBaseCatalogDto {
    codigo: string;
    nombre: string;
}
declare const UpdateBaseCatalogDto_base: import("@nestjs/common").Type<Partial<CreateBaseCatalogDto>>;
export declare class UpdateBaseCatalogDto extends UpdateBaseCatalogDto_base {
}
export declare class CreateServicioDto extends CreateBaseCatalogDto {
    activo?: boolean;
}
declare const UpdateServicioDto_base: import("@nestjs/common").Type<Partial<CreateServicioDto>>;
export declare class UpdateServicioDto extends UpdateServicioDto_base {
}
export declare class CreateTipoPropiedadDto {
    tenencia?: string;
    uso?: string;
    tipologia?: string;
    descripcion?: string;
}
declare const UpdateTipoPropiedadDto_base: import("@nestjs/common").Type<Partial<CreateTipoPropiedadDto>>;
export declare class UpdateTipoPropiedadDto extends UpdateTipoPropiedadDto_base {
}
export declare class CreateCiudadDto {
    nombre: string;
    estado?: string;
    codigo?: string;
}
declare const UpdateCiudadDto_base: import("@nestjs/common").Type<Partial<CreateCiudadDto>>;
export declare class UpdateCiudadDto extends UpdateCiudadDto_base {
}
export {};
