
import { IsNotEmpty, IsNumber, IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum LeadPriority {
    BAJA = 'BAJA',
    MEDIA = 'MEDIA',
    ALTA = 'ALTA',
    URGENTE = 'URGENTE',
}

export class CreateLeadDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    id_contacto: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    id_servicio_principal?: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    estado: string;

    @ApiProperty({ enum: LeadPriority, default: LeadPriority.MEDIA })
    @IsEnum(LeadPriority)
    @IsOptional()
    prioridad?: LeadPriority;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    id_usuario_asignado?: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    notas_iniciales?: string;
}
