import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

@Injectable()
export class TemplatesService {
  constructor(private prisma: PrismaService) {}

  async create(createTemplateDto: CreateTemplateDto) {
    return this.prisma.crmPlantillaCorreo.create({
      data: createTemplateDto,
    });
  }

  async findAll() {
    return this.prisma.crmPlantillaCorreo.findMany({
      where: { activo: true },
      orderBy: { creado_en: 'desc' },
    });
  }

  async findOne(id: number) {
    const template = await this.prisma.crmPlantillaCorreo.findUnique({
      where: { id_plantilla: id },
    });
    if (!template) {
      throw new NotFoundException(`Plantilla con ID ${id} no encontrada`);
    }
    return template;
  }

  async update(id: number, updateTemplateDto: UpdateTemplateDto) {
    return this.prisma.crmPlantillaCorreo.update({
      where: { id_plantilla: id },
      data: updateTemplateDto,
    });
  }

  async remove(id: number) {
    return this.prisma.crmPlantillaCorreo.update({
      where: { id_plantilla: id },
      data: { activo: false },
    });
  }
}
