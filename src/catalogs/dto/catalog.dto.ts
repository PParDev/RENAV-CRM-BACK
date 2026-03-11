import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateBaseCatalogDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    codigo: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombre: string;
}

export class UpdateBaseCatalogDto extends PartialType(CreateBaseCatalogDto) { }

export class CreateServicioDto extends CreateBaseCatalogDto {
    @ApiProperty({ required: false, default: true })
    @IsBoolean()
    @IsOptional()
    activo?: boolean;
}

export class UpdateServicioDto extends PartialType(CreateServicioDto) { }

export class CreateTipoPropiedadDto {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    tenencia?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    uso?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    descripcion?: string;
}

export class UpdateTipoPropiedadDto extends PartialType(CreateTipoPropiedadDto) { }

export class CreateCiudadDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    estado?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    codigo?: string;
}

export class UpdateCiudadDto extends PartialType(CreateCiudadDto) { }
