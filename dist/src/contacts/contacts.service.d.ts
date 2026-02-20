import { PrismaService } from '../database/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { CrmContacto } from '@prisma/client';
export declare class ContactsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createContactDto: CreateContactDto): Promise<CrmContacto>;
    findAll(skip?: number, take?: number, search?: string): Promise<CrmContacto[]>;
    findOne(id: number): Promise<CrmContacto>;
    update(id: number, updateContactDto: UpdateContactDto): Promise<CrmContacto>;
    remove(id: number): Promise<CrmContacto>;
    findByEmail(email: string): Promise<CrmContacto | null>;
}
