
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDecimal } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDevelopmentDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    ciudad?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    id_desarrollador?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    id_estado_relac_des?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    nivel_certeza_legal?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    cat_estado_doc?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    id_origen_proyecto?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    porcentaje_comision?: number;
}
