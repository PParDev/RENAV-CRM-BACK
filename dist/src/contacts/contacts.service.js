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
exports.ContactsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let ContactsService = class ContactsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createContactDto) {
        return this.prisma.crmContacto.create({
            data: createContactDto,
        });
    }
    async findAll(skip, take, search) {
        const where = search ? {
            OR: [
                { nombre: { contains: search, mode: 'insensitive' } },
                { correo: { contains: search, mode: 'insensitive' } },
                { telefono: { contains: search, mode: 'insensitive' } },
            ],
        } : undefined;
        return this.prisma.crmContacto.findMany({
            skip,
            take,
            where,
            orderBy: { creado_en: 'desc' },
        });
    }
    async findOne(id) {
        const contact = await this.prisma.crmContacto.findUnique({
            where: { id_contacto: id },
        });
        if (!contact) {
            throw new common_1.NotFoundException(`Contact with ID ${id} not found`);
        }
        return contact;
    }
    async update(id, updateContactDto) {
        try {
            return await this.prisma.crmContacto.update({
                where: { id_contacto: id },
                data: updateContactDto,
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`Contact with ID ${id} not found`);
            }
            throw error;
        }
    }
    async remove(id) {
        try {
            return await this.prisma.crmContacto.delete({
                where: { id_contacto: id },
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`Contact with ID ${id} not found`);
            }
            throw error;
        }
    }
    async findByEmail(email) {
        return this.prisma.crmContacto.findFirst({
            where: { correo: email },
        });
    }
};
exports.ContactsService = ContactsService;
exports.ContactsService = ContactsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContactsService);
//# sourceMappingURL=contacts.service.js.map