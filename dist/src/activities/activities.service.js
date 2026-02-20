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
exports.ActivitiesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let ActivitiesService = class ActivitiesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createActivityDto) {
        const { tipo, ...rest } = createActivityDto;
        return this.prisma.crmActividad.create({
            data: {
                ...rest,
                tipo,
            },
        });
    }
    async findAllByLead(leadId) {
        return this.prisma.crmActividad.findMany({
            where: { id_lead: leadId },
            orderBy: { creada_en: 'desc' },
            include: { usuario: true },
        });
    }
    async findAll(leadId) {
        const where = leadId ? { id_lead: leadId } : undefined;
        return this.prisma.crmActividad.findMany({
            where,
            orderBy: { creada_en: 'desc' },
            include: { lead: true, usuario: true },
        });
    }
    async findOne(id) {
        const activity = await this.prisma.crmActividad.findUnique({
            where: { id_actividad: id },
        });
        if (!activity) {
            throw new common_1.NotFoundException(`Activity with ID ${id} not found`);
        }
        return activity;
    }
    async update(id, updateActivityDto) {
        try {
            return await this.prisma.crmActividad.update({
                where: { id_actividad: id },
                data: updateActivityDto,
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`Activity with ID ${id} not found`);
            }
            throw error;
        }
    }
    async remove(id) {
        try {
            return await this.prisma.crmActividad.delete({
                where: { id_actividad: id },
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`Activity with ID ${id} not found`);
            }
            throw error;
        }
    }
};
exports.ActivitiesService = ActivitiesService;
exports.ActivitiesService = ActivitiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ActivitiesService);
//# sourceMappingURL=activities.service.js.map