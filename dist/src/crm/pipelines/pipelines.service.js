"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelinesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let PipelinesService = class PipelinesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.crmEtapaPipeline.create({ data });
    }
    async findAll() {
        return this.prisma.crmEtapaPipeline.findMany({
            orderBy: { orden: 'asc' },
            include: { servicio: true }
        });
    }
    async findOne(id) {
        const etapa = await this.prisma.crmEtapaPipeline.findUnique({
            where: { id_etapa: id },
            include: { servicio: true }
        });
        if (!etapa)
            throw new common_1.NotFoundException('Pipeline stage not found');
        return etapa;
    }
    async update(id, data) {
        try {
            return await this.prisma.crmEtapaPipeline.update({
                where: { id_etapa: id },
                data,
            });
        }
        catch (error) {
            throw new common_1.NotFoundException('Pipeline stage not found');
        }
    }
    async remove(id) {
        try {
            return await this.prisma.crmEtapaPipeline.delete({
                where: { id_etapa: id },
            });
        }
        catch (error) {
            throw new common_1.NotFoundException('Pipeline stage not found');
        }
    }
};
exports.PipelinesService = PipelinesService;
exports.PipelinesService = PipelinesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PipelinesService);
//# sourceMappingURL=pipelines.service.js.map