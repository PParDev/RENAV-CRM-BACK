import { PrismaService } from '../../database/prisma.service';
import { CreatePipelineDto, UpdatePipelineDto } from './dto/create-pipeline.dto';
import { CrmEtapaPipeline } from '@prisma/client';
export declare class PipelinesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreatePipelineDto): Promise<CrmEtapaPipeline>;
    findAll(): Promise<CrmEtapaPipeline[]>;
    findOne(id: number): Promise<CrmEtapaPipeline>;
    update(id: number, data: UpdatePipelineDto): Promise<CrmEtapaPipeline>;
    remove(id: number): Promise<CrmEtapaPipeline>;
}
