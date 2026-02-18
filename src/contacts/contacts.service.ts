
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { CrmContacto } from '@prisma/client';

@Injectable()
export class ContactsService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createContactDto: CreateContactDto): Promise<CrmContacto> {
        return this.prisma.crmContacto.create({
            data: createContactDto,
        });
    }

    async findAll(
        skip?: number,
        take?: number,
        search?: string
    ): Promise<CrmContacto[]> {
        const where = search ? {
            OR: [
                { nombre: { contains: search, mode: 'insensitive' as const } },
                { correo: { contains: search, mode: 'insensitive' as const } },
                { telefono: { contains: search, mode: 'insensitive' as const } },
            ],
        } : undefined;

        return this.prisma.crmContacto.findMany({
            skip,
            take,
            where,
            orderBy: { creado_en: 'desc' },
        });
    }

    async findOne(id: number): Promise<CrmContacto> {
        const contact = await this.prisma.crmContacto.findUnique({
            where: { id_contacto: id },
        });

        if (!contact) {
            throw new NotFoundException(`Contact with ID ${id} not found`);
        }

        return contact;
    }

    async update(id: number, updateContactDto: UpdateContactDto): Promise<CrmContacto> {
        try {
            return await this.prisma.crmContacto.update({
                where: { id_contacto: id },
                data: updateContactDto,
            });
        } catch (error) {
            if ((error as any).code === 'P2025') {
                throw new NotFoundException(`Contact with ID ${id} not found`);
            }
            throw error;
        }
    }

    async remove(id: number): Promise<CrmContacto> {
        try {
            return await this.prisma.crmContacto.delete({
                where: { id_contacto: id },
            });
        } catch (error) {
            if ((error as any).code === 'P2025') {
                throw new NotFoundException(`Contact with ID ${id} not found`);
            }
            throw error;
        }
    }

    async findByEmail(email: string): Promise<CrmContacto | null> {
        return this.prisma.crmContacto.findFirst({
            where: { correo: email },
        });
    }
}
