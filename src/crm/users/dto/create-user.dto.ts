import { IsEnum, IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsBoolean, IsArray, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({ enum: Role, default: Role.SALES })
    @IsEnum(Role)
    role: Role;

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

    @ApiPropertyOptional({ type: [Number] })
    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    servicios?: number[];
}
