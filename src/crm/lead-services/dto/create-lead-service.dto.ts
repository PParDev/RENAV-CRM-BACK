import { IsInt, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateLeadServiceDto {
    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    id_lead: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    id_servicio: number;

    @ApiProperty({ required: false, default: false })
    @IsBoolean()
    @IsOptional()
    es_principal?: boolean;
}

export class UpdateLeadServiceDto extends PartialType(CreateLeadServiceDto) {}
