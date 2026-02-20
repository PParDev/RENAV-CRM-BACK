
import { IsNotEmpty, IsNumber, IsOptional, IsDecimal, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVentaDto {
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
    precio_cierre?: number;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    fecha_cierre?: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    porc_comision?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    monto_comision?: number;
}
