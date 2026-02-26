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
exports.TypologiesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let TypologiesService = class TypologiesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTypologyDto) {
        const desarrollo = await this.prisma.invDesarrollo.findUnique({
            where: { id_desarrollo: createTypologyDto.id_desarrollo }
        });
        if (!desarrollo) {
            throw new common_1.NotFoundException(`Development with ID ${createTypologyDto.id_desarrollo} not found`);
        }
        return this.prisma.invTipologia.create({
            data: createTypologyDto,
        });
    }
    async findAll(skip, take, id_desarrollo, search) {
        const where = {};
        if (id_desarrollo)
            where.id_desarrollo = id_desarrollo;
        if (search) {
            where.nombre = { contains: search, mode: 'insensitive' };
        }
        return this.prisma.invTipologia.findMany({
            skip,
            take,
            where,
            include: {
                desarrollo: {
                    select: { nombre: true, inv_ciudad: true }
                }
            },
            orderBy: { id_tipologia: 'desc' },
        });
    }
    async findOne(id) {
        const tipologia = await this.prisma.invTipologia.findUnique({
            where: { id_tipologia: id },
            include: {
                desarrollo: true,
                unidades: true
            }
        });
        if (!tipologia) {
            throw new common_1.NotFoundException(`Typology with ID ${id} not found`);
        }
        return tipologia;
    }
    async update(id, updateTypologyDto) {
        if (updateTypologyDto.id_desarrollo) {
            const desarrollo = await this.prisma.invDesarrollo.findUnique({
                where: { id_desarrollo: updateTypologyDto.id_desarrollo }
            });
            if (!desarrollo) {
                throw new common_1.NotFoundException(`Development with ID ${updateTypologyDto.id_desarrollo} not found`);
            }
        }
        try {
            return await this.prisma.invTipologia.update({
                where: { id_tipologia: id },
                data: updateTypologyDto,
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`Typology with ID ${id} not found`);
            }
            throw error;
        }
    }
    async remove(id) {
        try {
            return await this.prisma.invTipologia.delete({
                where: { id_tipologia: id },
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`Typology with ID ${id} not found`);
            }
            throw error;
        }
    }
};
exports.TypologiesService = TypologiesService;
exports.TypologiesService = TypologiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TypologiesService);
//# sourceMappingURL=typologies.service.js.map