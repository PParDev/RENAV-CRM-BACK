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
exports.LeadHistoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let LeadHistoryService = class LeadHistoryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.crmHistorialEtapaLead.create({ data });
    }
    async findAll(leadId) {
        const where = leadId ? { id_lead: leadId } : {};
        return this.prisma.crmHistorialEtapaLead.findMany({
            where,
            orderBy: { cambiado_en: 'desc' },
            include: { lead: true, etapa: true, usuario: true }
        });
    }
    async findOne(id) {
        const history = await this.prisma.crmHistorialEtapaLead.findUnique({
            where: { id_historial: id },
            include: { lead: true, etapa: true, usuario: true }
        });
        if (!history)
            throw new common_1.NotFoundException('History record not found');
        return history;
    }
    async update(id, data) {
        try {
            return await this.prisma.crmHistorialEtapaLead.update({
                where: { id_historial: id },
                data,
            });
        }
        catch (error) {
            throw new common_1.NotFoundException('History record not found');
        }
    }
    async remove(id) {
        try {
            return await this.prisma.crmHistorialEtapaLead.delete({
                where: { id_historial: id },
            });
        }
        catch (error) {
            throw new common_1.NotFoundException('History record not found');
        }
    }
};
exports.LeadHistoryService = LeadHistoryService;
exports.LeadHistoryService = LeadHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LeadHistoryService);
//# sourceMappingURL=lead-history.service.js.map