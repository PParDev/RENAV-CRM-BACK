import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
export declare class ContactsController {
    private readonly contactsService;
    constructor(contactsService: ContactsService);
    create(createContactDto: CreateContactDto): Promise<{
        nombre: string;
        telefono: string | null;
        ciudad: string | null;
        creado_en: Date;
        id_contacto: number;
        correo: string | null;
        origen: string | null;
    }>;
    findAll(skip?: number, take?: number, search?: string): Promise<{
        nombre: string;
        telefono: string | null;
        ciudad: string | null;
        creado_en: Date;
        id_contacto: number;
        correo: string | null;
        origen: string | null;
    }[]>;
    findOne(id: number): Promise<{
        nombre: string;
        telefono: string | null;
        ciudad: string | null;
        creado_en: Date;
        id_contacto: number;
        correo: string | null;
        origen: string | null;
    }>;
    update(id: number, updateContactDto: UpdateContactDto): Promise<{
        nombre: string;
        telefono: string | null;
        ciudad: string | null;
        creado_en: Date;
        id_contacto: number;
        correo: string | null;
        origen: string | null;
    }>;
    remove(id: number): Promise<{
        nombre: string;
        telefono: string | null;
        ciudad: string | null;
        creado_en: Date;
        id_contacto: number;
        correo: string | null;
        origen: string | null;
    }>;
}
