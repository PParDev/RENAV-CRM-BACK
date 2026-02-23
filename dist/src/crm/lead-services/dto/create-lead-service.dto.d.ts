export declare class CreateLeadServiceDto {
    id_lead: number;
    id_servicio: number;
    es_principal?: boolean;
}
declare const UpdateLeadServiceDto_base: import("@nestjs/common").Type<Partial<CreateLeadServiceDto>>;
export declare class UpdateLeadServiceDto extends UpdateLeadServiceDto_base {
}
export {};
