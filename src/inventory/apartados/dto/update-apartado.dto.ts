import { PartialType } from '@nestjs/mapped-types';
import { CreateApartadoDto } from './create-apartado.dto';

export class UpdateApartadoDto extends PartialType(CreateApartadoDto) { }
