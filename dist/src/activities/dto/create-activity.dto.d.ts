export declare enum ActivityType {
    NOTE = "NOTE",
    CALL = "CALL",
    TASK = "TASK",
    WHATSAPP = "WHATSAPP",
    EMAIL = "EMAIL"
}
export declare class CreateActivityDto {
    id_lead: number;
    tipo: string;
    descripcion: string;
    programada_para?: string;
    creada_por?: number;
}
