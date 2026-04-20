import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTemplateDto {
  @ApiProperty({ example: 'Bienvenida Cliente' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'Gracias por contactarnos' })
  @IsString()
  @IsNotEmpty()
  asunto: string;

  @ApiProperty({ example: '<p>Hola {{nombre}}, bienvenido...</p>' })
  @IsString()
  @IsNotEmpty()
  cuerpo: string;

  @ApiProperty({ required: false, default: true })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
