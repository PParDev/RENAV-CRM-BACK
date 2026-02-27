import { DevelopersService } from './developers.service';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
export declare class DevelopersController {
    private readonly developersService;
    constructor(developersService: DevelopersService);
    create(createDeveloperDto: CreateDeveloperDto): Promise<{
        nombre: string;
        id_desarrollador: number;
        ubicacion: string | null;
        email: string | null;
        telefono: string | null;
    }>;
    findAll(search?: string): Promise<{
        nombre: string;
        id_desarrollador: number;
        ubicacion: string | null;
        email: string | null;
        telefono: string | null;
    }[]>;
    findOne(id: number): Promise<{
        nombre: string;
        id_desarrollador: number;
        ubicacion: string | null;
        email: string | null;
        telefono: string | null;
    }>;
    update(id: number, updateDeveloperDto: UpdateDeveloperDto): Promise<{
        nombre: string;
        id_desarrollador: number;
        ubicacion: string | null;
        email: string | null;
        telefono: string | null;
    }>;
    remove(id: number): Promise<{
        nombre: string;
        id_desarrollador: number;
        ubicacion: string | null;
        email: string | null;
        telefono: string | null;
    }>;
}
