import { PrismaService } from '../../database/prisma.service';
import { CreateApartadoDto } from './dto/create-apartado.dto';
import { UpdateApartadoDto } from './dto/update-apartado.dto';
import { InvApartado } from '@prisma/client';
export declare class ApartadosService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createApartadoDto: CreateApartadoDto): Promise<InvApartado>;
    findAll(skip?: number, take?: number, id_unidad?: number, id_lead?: number, status?: boolean): Promise<InvApartado[]>;
    findOne(id: number): Promise<InvApartado>;
    update(id: number, updateApartadoDto: UpdateApartadoDto): Promise<InvApartado>;
    remove(id: number): Promise<InvApartado>;
}
