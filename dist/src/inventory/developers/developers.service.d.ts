import { PrismaService } from '../../database/prisma.service';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { InvDesarrollador } from '@prisma/client';
export declare class DevelopersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDeveloperDto: CreateDeveloperDto): Promise<InvDesarrollador>;
    findAll(search?: string): Promise<InvDesarrollador[]>;
    findOne(id: number): Promise<InvDesarrollador>;
    update(id: number, updateDeveloperDto: UpdateDeveloperDto): Promise<InvDesarrollador>;
    remove(id: number): Promise<InvDesarrollador>;
}
