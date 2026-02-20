
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {
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
