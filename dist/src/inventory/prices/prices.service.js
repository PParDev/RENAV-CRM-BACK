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
exports.PricesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let PricesService = class PricesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addPriceToUnit(idUnidad, dto) {
        const unidad = await this.prisma.invUnidad.findUnique({
            where: { id_unidad: idUnidad },
        });
        if (!unidad) {
            throw new common_1.NotFoundException(`Unit with ID ${idUnidad} not found`);
        }
        const lastPrice = await this.prisma.invPrecioHistorico.findFirst({
            where: { id_unidad: idUnidad, vigente_hasta: null },
            orderBy: { vigente_desde: 'desc' },
        });
        return this.prisma.$transaction(async (tx) => {
            if (lastPrice) {
                await tx.invPrecioHistorico.update({
                    where: { id_precio_historico: lastPrice.id_precio_historico },
                    data: { vigente_hasta: new Date(dto.vigente_desde) },
                });
            }
            const originDate = new Date(dto.vigente_desde);
            const validDate = isNaN(originDate.getTime()) ? new Date() : originDate;
            const newPriceHistory = await tx.invPrecioHistorico.create({
                data: {
                    id_unidad: idUnidad,
                    precio: dto.precio,
                    vigente_desde: validDate,
                    vigente_hasta: dto.vigente_hasta ? new Date(dto.vigente_hasta) : null,
                },
            });
            await tx.invUnidad.update({
                where: { id_unidad: idUnidad },
                data: { precios_lista: dto.precio },
            });
            return newPriceHistory;
        });
    }
    async getPriceHistory(idUnidad) {
        return this.prisma.invPrecioHistorico.findMany({
            where: { id_unidad: idUnidad },
            orderBy: { vigente_desde: 'desc' },
        });
    }
};
exports.PricesService = PricesService;
exports.PricesService = PricesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PricesService);
//# sourceMappingURL=prices.service.js.map