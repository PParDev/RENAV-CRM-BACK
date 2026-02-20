
import { IsNotEmpty, IsNumber, IsOptional, IsDecimal, IsDateString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApartadoDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    id_unidad: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    id_lead?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    monto_apartado?: number;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    fecha_apartado?: string;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    vence_en?: string;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    status?: boolean;
}
