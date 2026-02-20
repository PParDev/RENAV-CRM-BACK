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
exports.SalesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let SalesService = class SalesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createApartado(createApartadoDto) {
        const unit = await this.prisma.invUnidad.findUnique({
            where: { id_unidad: createApartadoDto.id_unidad },
        });
        if (!unit) {
            throw new common_1.NotFoundException('Unit not found');
        }
        return this.prisma.invApartado.create({
            data: createApartadoDto,
        });
    }
    async createVenta(createVentaDto) {
        const existingSale = await this.prisma.invVenta.findUnique({
            where: { id_unidad: createVentaDto.id_unidad },
        });
        if (existingSale) {
            throw new common_1.BadRequestException('Unit is already sold');
        }
        const unit = await this.prisma.invUnidad.findUnique({
            where: { id_unidad: createVentaDto.id_unidad },
        });
        if (!unit) {
            throw new common_1.NotFoundException('Unit not found');
        }
        return this.prisma.invVenta.create({
            data: createVentaDto,
        });
    }
    async findAllApartados(leadId) {
        const where = {};
        if (leadId)
            where.id_lead = leadId;
        return this.prisma.invApartado.findMany({
            where,
            include: { unidad: true, lead: true },
            orderBy: { fecha_apartado: 'desc' },
        });
    }
    async findAllVentas(leadId) {
        const where = {};
        if (leadId)
            where.id_lead = leadId;
        return this.prisma.invVenta.findMany({
            where,
            include: { unidad: true, lead: true },
            orderBy: { fecha_cierre: 'desc' },
        });
    }
};
exports.SalesService = SalesService;
exports.SalesService = SalesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SalesService);
//# sourceMappingURL=sales.service.js.map