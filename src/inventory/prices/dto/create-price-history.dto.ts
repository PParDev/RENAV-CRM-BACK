
import { IsNotEmpty, IsNumber, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePriceHistoryDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    precio: number;

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    vigente_desde: string;

    @ApiProperty({ required: false })
    @IsDateString()
    @IsOptional()
    vigente_hasta?: string;
}
