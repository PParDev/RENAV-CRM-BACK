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
exports.DevelopmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let DevelopmentsService = class DevelopmentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDevelopmentDto) {
        return this.prisma.invDesarrollo.create({
            data: createDevelopmentDto,
        });
    }
    async addTypology(desarrolloId, dto) {
        const desarrollo = await this.prisma.invDesarrollo.findUnique({
            where: { id_desarrollo: desarrolloId },
        });
        if (!desarrollo) {
            throw new common_1.NotFoundException(`Development with ID ${desarrolloId} not found`);
        }
        return this.prisma.invTipologia.create({
            data: {
                id_desarrollo: desarrolloId,
                nombre: dto.nombre,
                total_unidades: dto.total_unidades,
            },
        });
    }
    async findAll(skip, take, ciudad, desarrollador, search) {
        const where = {};
        if (ciudad)
            where.ciudad = ciudad;
        if (desarrollador)
            where.id_desarrollador = desarrollador;
        if (search) {
            where.nombre = { contains: search, mode: 'insensitive' };
        }
        return this.prisma.invDesarrollo.findMany({
            skip,
            take,
            where,
            include: {
                inv_ciudad: true,
                desarrollador: true,
                estado_relacion: true,
                certeza_legal: true,
                estado_doc: true,
                origen_proyecto: true,
            },
            orderBy: { creado_en: 'desc' },
        });
    }
    async findOne(id) {
        const development = await this.prisma.invDesarrollo.findUnique({
            where: { id_desarrollo: id },
            include: {
                inv_ciudad: true,
                desarrollador: true,
                estado_relacion: true,
                certeza_legal: true,
                estado_doc: true,
                origen_proyecto: true,
                tipologias: true,
                unidades: {
                    select: { id_unidad: true, codigo_unidad: true, precios_lista: true, m2_construccion: true, id_estado_unidad: true }
                }
            },
        });
        if (!development) {
            throw new common_1.NotFoundException(`Development with ID ${id} not found`);
        }
        return development;
    }
    async update(id, updateDevelopmentDto) {
        try {
            return await this.prisma.invDesarrollo.update({
                where: { id_desarrollo: id },
                data: updateDevelopmentDto,
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`Development with ID ${id} not found`);
            }
            throw error;
        }
    }
    async remove(id) {
        try {
            return await this.prisma.invDesarrollo.delete({
                where: { id_desarrollo: id },
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`Development with ID ${id} not found`);
            }
            throw error;
        }
    }
};
exports.DevelopmentsService = DevelopmentsService;
exports.DevelopmentsService = DevelopmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DevelopmentsService);
//# sourceMappingURL=developments.service.js.map