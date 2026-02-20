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
exports.UnitsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let UnitsService = class UnitsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUnitDto) {
        return this.prisma.invUnidad.create({
            data: createUnitDto,
        });
    }
    async findAll(skip, take, desarrolloId, codigo) {
        const where = {};
        if (desarrolloId)
            where.id_desarrollo = desarrolloId;
        if (codigo)
            where.codigo_unidad = { contains: codigo, mode: 'insensitive' };
        return this.prisma.invUnidad.findMany({
            skip,
            take,
            where,
            include: {
                desarrollo: true,
                tipologia: true,
                tipo_inmueble: true,
                estado_unidad: true,
                tipo_propiedad: true,
            },
            orderBy: { id_unidad: 'desc' },
        });
    }
    async findOne(id) {
        const unit = await this.prisma.invUnidad.findUnique({
            where: { id_unidad: id },
            include: {
                desarrollo: true,
                tipologia: true,
                tipo_inmueble: true,
                estado_unidad: true,
                tipo_propiedad: true,
                precios_historicos: { orderBy: { vigente_desde: 'desc' } },
                apartados: true,
                ventas: true,
            },
        });
        if (!unit) {
            throw new common_1.NotFoundException(`Unit with ID ${id} not found`);
        }
        return unit;
    }
    async update(id, updateUnitDto) {
        try {
            return await this.prisma.invUnidad.update({
                where: { id_unidad: id },
                data: updateUnitDto,
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`Unit with ID ${id} not found`);
            }
            throw error;
        }
    }
    async remove(id) {
        try {
            return await this.prisma.invUnidad.delete({
                where: { id_unidad: id },
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`Unit with ID ${id} not found`);
            }
            throw error;
        }
    }
};
exports.UnitsService = UnitsService;
exports.UnitsService = UnitsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UnitsService);
//# sourceMappingURL=units.service.js.map