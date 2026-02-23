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
exports.LeadServicesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let LeadServicesService = class LeadServicesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.crmLeadServicio.create({ data });
    }
    async findAll(leadId) {
        const where = leadId ? { id_lead: leadId } : {};
        return this.prisma.crmLeadServicio.findMany({
            where,
            include: { lead: true, servicio: true }
        });
    }
    async findOne(id) {
        const rs = await this.prisma.crmLeadServicio.findUnique({
            where: { id_lead_servicio: id },
            include: { lead: true, servicio: true }
        });
        if (!rs)
            throw new common_1.NotFoundException('Lead service not found');
        return rs;
    }
    async update(id, data) {
        try {
            return await this.prisma.crmLeadServicio.update({
                where: { id_lead_servicio: id },
                data,
            });
        }
        catch (error) {
            throw new common_1.NotFoundException('Lead service not found');
        }
    }
    async remove(id) {
        try {
            return await this.prisma.crmLeadServicio.delete({
                where: { id_lead_servicio: id },
            });
        }
        catch (error) {
            throw new common_1.NotFoundException('Lead service not found');
        }
    }
};
exports.LeadServicesService = LeadServicesService;
exports.LeadServicesService = LeadServicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LeadServicesService);
//# sourceMappingURL=lead-services.service.js.map