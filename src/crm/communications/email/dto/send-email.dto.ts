import { IsString, IsNotEmpty, IsOptional, IsEmail, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';

export class SendEmailDto {
  @ApiProperty({ example: 1, description: 'ID del Lead (opcional si se provee email manual)' })
  @Transform(({ value }) => (value === '' || value === 'undefined' ? undefined : Number(value)))
  @IsInt()
  @IsOptional()
  id_lead?: number;

  @ApiProperty({ example: 'cliente@correo.com', description: 'Email directo si no hay ID de lead' })
  @Transform(({ value }) => (value === '' || value === 'undefined' ? undefined : value))
  @IsEmail()
  @IsOptional()
  to?: string;

  @ApiProperty({ example: 'Juan Perez', description: 'Nombre del destinatario (opcional)' })
  @IsString()
  @IsOptional()
  to_name?: string;

  @ApiProperty({ example: 'Asunto personalizado' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ example: '<p>Cuerpo del correo</p>' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: 1, description: 'ID de la plantilla usada (opcional, para tracking)' })
  @Transform(({ value }) => (value === '' || value === 'undefined' ? undefined : Number(value)))
  @IsInt()
  @IsOptional()
  id_plantilla?: number;

  @IsOptional()
  attachments?: any;
}
