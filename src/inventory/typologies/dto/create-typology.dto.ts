import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTypologyDto {
    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    id_desarrollo: number;

    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    total_unidades?: number;
}
