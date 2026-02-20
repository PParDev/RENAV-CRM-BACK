import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
export declare class ContactsController {
    private readonly contactsService;
    constructor(contactsService: ContactsService);
    create(createContactDto: CreateContactDto): Promise<{
        id_contacto: number;
        creado_en: Date;
        telefono: string | null;
        correo: string | null;
        nombre: string;
        origen: string | null;
        ciudad: string | null;
    }>;
    findAll(skip?: number, take?: number, search?: string): Promise<{
        id_contacto: number;
        creado_en: Date;
        telefono: string | null;
        correo: string | null;
        nombre: string;
        origen: string | null;
        ciudad: string | null;
    }[]>;
    findOne(id: number): Promise<{
        id_contacto: number;
        creado_en: Date;
        telefono: string | null;
        correo: string | null;
        nombre: string;
        origen: string | null;
        ciudad: string | null;
    }>;
    update(id: number, updateContactDto: UpdateContactDto): Promise<{
        id_contacto: number;
        creado_en: Date;
        telefono: string | null;
        correo: string | null;
        nombre: string;
        origen: string | null;
        ciudad: string | null;
    }>;
    remove(id: number): Promise<{
        id_contacto: number;
        creado_en: Date;
        telefono: string | null;
        correo: string | null;
        nombre: string;
        origen: string | null;
        ciudad: string | null;
    }>;
}
