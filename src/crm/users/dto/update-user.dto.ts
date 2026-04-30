import { IsEnum, IsEmail, IsString, IsOptional, IsBoolean, IsArray, IsInt } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UpdateUserDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    nombre?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    password?: string;

    @ApiPropertyOptional({ enum: Role })
    @IsOptional()
    @IsEnum(Role)
    role?: Role;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    telefono?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    activo?: boolean;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    whatsapp?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    facebook?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    instagram?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    bio?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    perfil_completo?: boolean;

    @ApiPropertyOptional({ type: [Number] })
    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    servicios?: number[];
}
