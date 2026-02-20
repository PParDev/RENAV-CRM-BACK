import { PrismaService } from '../../database/prisma.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
export declare class CitiesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createCityDto: CreateCityDto): Promise<{
        estado: string | null;
        nombre: string;
        codigo: string | null;
        id_inv_ciudad: number;
    }>;
    findAll(): Promise<{
        estado: string | null;
        nombre: string;
        codigo: string | null;
        id_inv_ciudad: number;
    }[]>;
    findOne(id: number): Promise<{
        estado: string | null;
        nombre: string;
        codigo: string | null;
        id_inv_ciudad: number;
    }>;
    update(id: number, updateCityDto: UpdateCityDto): Promise<{
        estado: string | null;
        nombre: string;
        codigo: string | null;
        id_inv_ciudad: number;
    }>;
    remove(id: number): Promise<{
        estado: string | null;
        nombre: string;
        codigo: string | null;
        id_inv_ciudad: number;
    }>;
}
