import { IsInt, IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreatePipelineDto {
    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    id_servicio: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    orden: number;

    @ApiProperty({ required: false, default: true })
    @IsBoolean()
    @IsOptional()
    activo?: boolean;
}

export class UpdatePipelineDto extends PartialType(CreatePipelineDto) {}
