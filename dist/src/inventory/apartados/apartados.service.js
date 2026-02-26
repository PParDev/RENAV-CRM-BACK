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
exports.ApartadosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let ApartadosService = class ApartadosService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createApartadoDto) {
        const unidad = await this.prisma.invUnidad.findUnique({
            where: { id_unidad: createApartadoDto.id_unidad }
        });
        if (!unidad) {
            throw new common_1.NotFoundException(`Unit with ID ${createApartadoDto.id_unidad} not found`);
        }
        if (createApartadoDto.id_lead) {
            const lead = await this.prisma.crmLead.findUnique({
                where: { id_lead: createApartadoDto.id_lead }
            });
            if (!lead) {
                throw new common_1.NotFoundException(`Lead with ID ${createApartadoDto.id_lead} not found`);
            }
        }
        const data = { ...createApartadoDto };
        if (data.fecha_apartado) {
            data.fecha_apartado = new Date(data.fecha_apartado);
        }
        if (data.vence_en) {
            data.vence_en = new Date(data.vence_en);
        }
        return this.prisma.invApartado.create({
            data,
        });
    }
    async findAll(skip, take, id_unidad, id_lead, status) {
        const where = {};
        if (id_unidad)
            where.id_unidad = id_unidad;
        if (id_lead)
            where.id_lead = id_lead;
        if (status !== undefined)
            where.status = status;
        return this.prisma.invApartado.findMany({
            skip,
            take,
            where,
            include: {
                unidad: {
                    select: { codigo_unidad: true, desarrollo: { select: { nombre: true } } }
                },
                lead: {
                    select: { contacto: { select: { nombre: true, correo: true, telefono: true } } }
                }
            },
            orderBy: { fecha_apartado: 'desc' },
        });
    }
    async findOne(id) {
        const apartado = await this.prisma.invApartado.findUnique({
            where: { id_apartado: id },
            include: {
                unidad: true,
                lead: {
                    include: {
                        contacto: true
                    }
                }
            }
        });
        if (!apartado) {
            throw new common_1.NotFoundException(`Apartado with ID ${id} not found`);
        }
        return apartado;
    }
    async update(id, updateApartadoDto) {
        if (updateApartadoDto.id_unidad) {
            const unidad = await this.prisma.invUnidad.findUnique({
                where: { id_unidad: updateApartadoDto.id_unidad }
            });
            if (!unidad) {
                throw new common_1.NotFoundException(`Unit with ID ${updateApartadoDto.id_unidad} not found`);
            }
        }
        if (updateApartadoDto.id_lead) {
            const lead = await this.prisma.crmLead.findUnique({
                where: { id_lead: updateApartadoDto.id_lead }
            });
            if (!lead) {
                throw new common_1.NotFoundException(`Lead with ID ${updateApartadoDto.id_lead} not found`);
            }
        }
        const data = { ...updateApartadoDto };
        if (data.fecha_apartado) {
            data.fecha_apartado = new Date(data.fecha_apartado);
        }
        if (data.vence_en) {
            data.vence_en = new Date(data.vence_en);
        }
        try {
            return await this.prisma.invApartado.update({
                where: { id_apartado: id },
                data,
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`Apartado with ID ${id} not found`);
            }
            throw error;
        }
    }
    async remove(id) {
        try {
            return await this.prisma.invApartado.delete({
                where: { id_apartado: id },
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`Apartado with ID ${id} not found`);
            }
            throw error;
        }
    }
};
exports.ApartadosService = ApartadosService;
exports.ApartadosService = ApartadosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ApartadosService);
//# sourceMappingURL=apartados.service.js.map