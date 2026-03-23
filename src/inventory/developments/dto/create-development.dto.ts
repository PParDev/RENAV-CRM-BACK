
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
    id_zona?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    porcentaje_comision?: number;

    @ApiProperty({ required: false, description: 'Alcance del proyecto: LOCAL o NACIONAL' })
    @IsString()
    @IsOptional()
    alcance?: string;

    @ApiProperty({ required: false, description: 'Porcentaje de comisión para el vendedor' })
    @IsNumber()
    @IsOptional()
    comision_vendedor?: number;

    @ApiProperty({ required: false, description: 'Condiciones de pago al contado' })
    @IsString()
    @IsOptional()
    metodo_contado?: string;

    @ApiProperty({ required: false, description: 'Condiciones de crédito hipotecario' })
    @IsString()
    @IsOptional()
    metodo_hipotecario?: string;

    @ApiProperty({ required: false, description: 'Condiciones de financiamiento propio' })
    @IsString()
    @IsOptional()
    metodo_financiamiento?: string;
}
