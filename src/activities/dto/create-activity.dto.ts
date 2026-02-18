
import { IsNotEmpty, IsNumber, IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum ActivityType {
    NOTE = 'NOTE',
    CALL = 'CALL',
    TASK = 'TASK',
    WHATSAPP = 'WHATSAPP',
    EMAIL = 'EMAIL',
}

export class CreateActivityDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    id_lead: number;

    @ApiProperty({ enum: ActivityType, default: ActivityType.NOTE })
    @IsEnum(ActivityType)
    @IsNotEmpty()
    tipo: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @ApiProperty({ required: false })
    @IsDateString()
    @IsOptional()
    programada_para?: string;

    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    creada_por?: number;
}
