import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateApartadoDto {
    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    id_unidad: number;

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    id_lead?: number;

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    monto_apartado?: number;

    @IsDateString()
    @IsOptional()
    fecha_apartado?: string;

    @IsDateString()
    @IsOptional()
    vence_en?: string;

    @IsBoolean()
    @IsOptional()
    status?: boolean;
}
