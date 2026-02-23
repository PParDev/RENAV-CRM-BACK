
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, ValidateNested, IsString, IsDecimal, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArquitecturaDto {
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    frente_m?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    fondo_m?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    superficie_m2?: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    ubicacion?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    zona?: string;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    conoce_compatibilidad_urbanistica?: boolean;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    id_tipo_proyecto?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    id_subtipo_habitacional?: number;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    proyectar_y_construir_inmediato?: boolean;
}

export class CreateConstruccionDto {
    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    tiene_proyecto?: boolean;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    frente_m?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    fondo_m?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    superficie_m2?: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    ubicacion?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    zona?: string;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    conoce_compatibilidad_urbanistica?: boolean;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    id_tipo_proyecto?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    id_subtipo_habitacional?: number;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    construccion_inmediata?: boolean;
}

export class CreateAvaluoDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    tipo_bien?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    ubicacion?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    zona?: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    frente_m?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    fondo_m?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    superficie_m2?: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    terreno_topografia?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    terreno_forma?: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    superficie_construida_m2?: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    fecha_visita?: string; // Expecting ISO date string to be parsed manually or validated

    @ApiProperty()
    @IsString()
    @IsOptional()
    temporalidad_entrega?: string;
}

export class CreateBienesRaicesDto {
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    id_tipo_inmueble?: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    ciudad?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    zona?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    ubicacion?: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    frente_m?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    fondo_m?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    superficie_m2?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    recamaras?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    banos?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    estacionamientos?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    m2_construidos_requeridos?: number;
}

export class CreateServiceRequestDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    id_lead: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    id_servicio: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    presupuesto_min?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    presupuesto_max?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    id_metodo_pago?: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    ciudad?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    zona?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    ubicacion_texto?: string;

    @ApiProperty({ type: CreateArquitecturaDto })
    @ValidateNested()
    @Type(() => CreateArquitecturaDto)
    @IsOptional()
    arquitectura?: CreateArquitecturaDto;

    @ApiProperty({ type: CreateConstruccionDto })
    @ValidateNested()
    @Type(() => CreateConstruccionDto)
    @IsOptional()
    construccion?: CreateConstruccionDto;

    @ApiProperty({ type: CreateAvaluoDto })
    @ValidateNested()
    @Type(() => CreateAvaluoDto)
    @IsOptional()
    avaluo?: CreateAvaluoDto;

    @ApiProperty({ type: CreateBienesRaicesDto })
    @ValidateNested()
    @Type(() => CreateBienesRaicesDto)
    @IsOptional()
    bienes_raices?: CreateBienesRaicesDto;
}
