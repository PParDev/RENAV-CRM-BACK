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
exports.DevelopersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let DevelopersService = class DevelopersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDeveloperDto) {
        return this.prisma.invDesarrollador.create({
            data: createDeveloperDto,
        });
    }
    async findAll(search) {
        const where = search ? {
            nombre: { contains: search, mode: 'insensitive' },
        } : undefined;
        return this.prisma.invDesarrollador.findMany({
            where,
            orderBy: { nombre: 'asc' },
        });
    }
    async findOne(id) {
        const developer = await this.prisma.invDesarrollador.findUnique({
            where: { id_desarrollador: id },
        });
        if (!developer) {
            throw new common_1.NotFoundException(`Developer with ID ${id} not found`);
        }
        return developer;
    }
    async update(id, updateDeveloperDto) {
        try {
            return await this.prisma.invDesarrollador.update({
                where: { id_desarrollador: id },
                data: updateDeveloperDto,
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`Developer with ID ${id} not found`);
            }
            throw error;
        }
    }
    async remove(id) {
        try {
            return await this.prisma.invDesarrollador.delete({
                where: { id_desarrollador: id },
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`Developer with ID ${id} not found`);
            }
            throw error;
        }
    }
};
exports.DevelopersService = DevelopersService;
exports.DevelopersService = DevelopersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DevelopersService);
//# sourceMappingURL=developers.service.js.map