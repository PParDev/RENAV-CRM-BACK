import { DevelopersService } from './developers.service';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
export declare class DevelopersController {
    private readonly developersService;
    constructor(developersService: DevelopersService);
    create(createDeveloperDto: CreateDeveloperDto): Promise<{
        nombre: string;
        ubicacion: string | null;
        email: string | null;
        telefono: string | null;
        id_desarrollador: number;
    }>;
    findAll(search?: string): Promise<{
        nombre: string;
        ubicacion: string | null;
        email: string | null;
        telefono: string | null;
        id_desarrollador: number;
    }[]>;
    findOne(id: number): Promise<{
        nombre: string;
        ubicacion: string | null;
        email: string | null;
        telefono: string | null;
        id_desarrollador: number;
    }>;
    update(id: number, updateDeveloperDto: UpdateDeveloperDto): Promise<{
        nombre: string;
        ubicacion: string | null;
        email: string | null;
        telefono: string | null;
        id_desarrollador: number;
    }>;
    remove(id: number): Promise<{
        nombre: string;
        ubicacion: string | null;
        email: string | null;
        telefono: string | null;
        id_desarrollador: number;
    }>;
}
