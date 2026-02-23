export declare class CreateLeadHistoryDto {
    id_lead: number;
    id_etapa: number;
    cambiado_por?: number;
}
declare const UpdateLeadHistoryDto_base: import("@nestjs/common").Type<Partial<CreateLeadHistoryDto>>;
export declare class UpdateLeadHistoryDto extends UpdateLeadHistoryDto_base {
}
export {};
