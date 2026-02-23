export declare class CreatePipelineDto {
    id_servicio: number;
    nombre: string;
    orden: number;
    activo?: boolean;
}
declare const UpdatePipelineDto_base: import("@nestjs/common").Type<Partial<CreatePipelineDto>>;
export declare class UpdatePipelineDto extends UpdatePipelineDto_base {
}
export {};
