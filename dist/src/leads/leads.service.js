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
exports.LeadsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let LeadsService = class LeadsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createLeadDto) {
        return this.prisma.crmLead.create({
            data: {
                id_contacto: createLeadDto.id_contacto,
                id_servicio_principal: createLeadDto.id_servicio_principal,
                estado: createLeadDto.estado,
                prioridad: createLeadDto.prioridad || 'MEDIA',
                id_usuario_asignado: createLeadDto.id_usuario_asignado,
                notas_iniciales: createLeadDto.notas_iniciales,
            },
            include: {
                contacto: true,
                usuario_asignado: true,
                servicio_principal: true,
            },
        });
    }
    async findAll(skip, take, estado, usuario, search) {
        const where = {};
        if (estado)
            where.estado = estado;
        if (usuario)
            where.id_usuario_asignado = usuario;
        if (search) {
            where.contacto = {
                OR: [
                    { nombre: { contains: search, mode: 'insensitive' } },
                    { correo: { contains: search, mode: 'insensitive' } },
                    { telefono: { contains: search, mode: 'insensitive' } },
                ],
            };
        }
        return this.prisma.crmLead.findMany({
            skip,
            take,
            where,
            include: {
                contacto: true,
                usuario_asignado: true,
                servicio_principal: true,
            },
            orderBy: { creado_en: 'desc' },
        });
    }
    async findOne(id) {
        const lead = await this.prisma.crmLead.findUnique({
            where: { id_lead: id },
            include: {
                contacto: true,
                usuario_asignado: true,
                servicio_principal: true,
                actividades: { orderBy: { creada_en: 'desc' } },
                solicitudes: true,
                historial_etapas: { orderBy: { cambiado_en: 'desc' }, include: { etapa: true, usuario: true } },
            },
        });
        if (!lead) {
            throw new common_1.NotFoundException(`Lead with ID ${id} not found`);
        }
        return lead;
    }
    async update(id, updateLeadDto) {
        const { estado, ...rest } = updateLeadDto;
        try {
            const data = { ...rest };
            if (estado)
                data.estado = estado;
            const lead = await this.prisma.crmLead.update({
                where: { id_lead: id },
                data,
                include: {
                    contacto: true,
                    usuario_asignado: true,
                    servicio_principal: true,
                },
            });
            return lead;
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`Lead with ID ${id} not found`);
            }
            throw error;
        }
    }
    async remove(id) {
        try {
            return await this.prisma.crmLead.delete({
                where: { id_lead: id },
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`Lead with ID ${id} not found`);
            }
            throw error;
        }
    }
};
exports.LeadsService = LeadsService;
exports.LeadsService = LeadsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LeadsService);
//# sourceMappingURL=leads.service.js.map