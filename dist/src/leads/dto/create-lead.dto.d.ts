export declare enum LeadPriority {
    BAJA = "BAJA",
    MEDIA = "MEDIA",
    ALTA = "ALTA",
    URGENTE = "URGENTE"
}
export declare class CreateLeadDto {
    id_contacto: number;
    id_servicio_principal?: number;
    estado: string;
    prioridad?: LeadPriority;
    id_usuario_asignado?: number;
    notas_iniciales?: string;
}
