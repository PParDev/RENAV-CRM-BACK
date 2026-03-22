
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDecimal, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUnitDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    id_desarrollo: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    id_tipologia?: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    codigo_unidad?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    descripcion?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    direccion?: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    m2_terreno?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    m2_construccion?: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    moneda?: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    precios_lista?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    id_tipo_inmueble?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    id_estado_unidad?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    id_tipo_propiedad?: number;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    fecha_obtencion?: string;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    fecha_terminacion?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    imagen_url?: string;

    @ApiProperty({ required: false, description: 'Nivel o piso dentro del desarrollo (ej. PB, 1, 3A)' })
    @IsString()
    @IsOptional()
    nivel_piso?: string;

    @ApiProperty({ required: false, description: 'Tipo de proyecto: RESIDENCIAL, COMERCIAL, etc.' })
    @IsString()
    @IsOptional()
    tipo_proyecto?: string;

    @ApiProperty({ required: false, description: 'Porcentaje de comisión a nivel de unidad (sobreescribe el del desarrollo)' })
    @IsNumber()
    @IsOptional()
    porcentaje_comision?: number;
}
