import { TypologiesService } from './typologies.service';
import { CreateTypologyDto } from './dto/create-typology.dto';
import { UpdateTypologyDto } from './dto/update-typology.dto';
export declare class TypologiesController {
    private readonly typologiesService;
    constructor(typologiesService: TypologiesService);
    create(createTypologyDto: CreateTypologyDto): Promise<{
        nombre: string;
        total_unidades: number | null;
        id_desarrollo: number;
        id_tipologia: number;
    }>;
    findAll(skip?: string, take?: string, id_desarrollo?: string, search?: string): Promise<{
        nombre: string;
        total_unidades: number | null;
        id_desarrollo: number;
        id_tipologia: number;
    }[]>;
    findOne(id: number): Promise<{
        nombre: string;
        total_unidades: number | null;
        id_desarrollo: number;
        id_tipologia: number;
    }>;
    update(id: number, updateTypologyDto: UpdateTypologyDto): Promise<{
        nombre: string;
        total_unidades: number | null;
        id_desarrollo: number;
        id_tipologia: number;
    }>;
    remove(id: number): Promise<{
        nombre: string;
        total_unidades: number | null;
        id_desarrollo: number;
        id_tipologia: number;
    }>;
}
