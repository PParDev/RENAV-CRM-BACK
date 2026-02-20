import { PrismaService } from '../database/prisma.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { CrmActividad } from '@prisma/client';
export declare class ActivitiesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createActivityDto: CreateActivityDto): Promise<CrmActividad>;
    findAllByLead(leadId: number): Promise<CrmActividad[]>;
    findAll(leadId?: number): Promise<CrmActividad[]>;
    findOne(id: number): Promise<CrmActividad>;
    update(id: number, updateActivityDto: UpdateActivityDto): Promise<CrmActividad>;
    remove(id: number): Promise<CrmActividad>;
}
