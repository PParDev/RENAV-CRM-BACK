import { IsNotEmpty, IsString, IsOptional, IsEmail, IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeveloperDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    ubicacion?: string;

    @ApiProperty({ required: false })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    telefono?: string;

    @ApiProperty({ required: false, type: [Number] })
    @IsArray()
    @IsNumber({}, { each: true })
    @IsOptional()
    zonas?: number[];
}
