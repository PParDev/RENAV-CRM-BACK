
import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @ApiProperty({ required: false })
    @IsEmail()
    @IsOptional()
    correo?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    telefono?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    origen?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    ciudad?: string;
}
