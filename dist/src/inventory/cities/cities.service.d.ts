import { PrismaService } from '../../database/prisma.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
export declare class CitiesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createCityDto: CreateCityDto): Promise<{
        codigo: string | null;
        nombre: string;
        estado: string | null;
        id_inv_ciudad: number;
    }>;
    findAll(): Promise<{
        codigo: string | null;
        nombre: string;
        estado: string | null;
        id_inv_ciudad: number;
    }[]>;
    findOne(id: number): Promise<{
        codigo: string | null;
        nombre: string;
        estado: string | null;
        id_inv_ciudad: number;
    }>;
    update(id: number, updateCityDto: UpdateCityDto): Promise<{
        codigo: string | null;
        nombre: string;
        estado: string | null;
        id_inv_ciudad: number;
    }>;
    remove(id: number): Promise<{
        codigo: string | null;
        nombre: string;
        estado: string | null;
        id_inv_ciudad: number;
    }>;
}
