import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateLeadHistoryDto {
    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    id_lead: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    id_etapa: number;

    @ApiProperty({ required: false })
    @IsInt()
    @IsOptional()
    cambiado_por?: number;
}

export class UpdateLeadHistoryDto extends PartialType(CreateLeadHistoryDto) {}
