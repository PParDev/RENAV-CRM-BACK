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
exports.CatalogsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let CatalogsService = class CatalogsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getServicios() {
        return this.prisma.catServicios.findMany({
            orderBy: { nombre: 'asc' },
        });
    }
    async getMetodosPago() {
        return this.prisma.catMetodoPago.findMany({
            orderBy: { nombre: 'asc' },
        });
    }
    async getTiposInmueble() {
        return this.prisma.catTipoInmueble.findMany({
            orderBy: { nombre: 'asc' },
        });
    }
    async getTiposProyecto() {
        return this.prisma.catTipoProyecto.findMany({
            orderBy: { nombre: 'asc' },
        });
    }
    async getSubtiposHabitacional() {
        return this.prisma.catSubtipoHabitacional.findMany({
            orderBy: { nombre: 'asc' },
        });
    }
    async getOrigenesProyecto() {
        return this.prisma.catOrigenProyecto.findMany({
            orderBy: { nombre: 'asc' },
        });
    }
    async getEstadosUnidad() {
        return this.prisma.catEstadoUnidad.findMany({
            orderBy: { nombre: 'asc' },
        });
    }
    async getEstadosRelacionDesarrollador() {
        return this.prisma.catEstadoRelacionDesarrollador.findMany({
            orderBy: { nombre: 'asc' },
        });
    }
    async getNivelesCertezaLegal() {
        return this.prisma.catNivelCertezaLegal.findMany({
            orderBy: { nombre: 'asc' },
        });
    }
    async getEstadosDocumentacion() {
        return this.prisma.catEstadoDocumentacion.findMany({
            orderBy: { nombre: 'asc' },
        });
    }
    async getTiposPropiedad() {
        return this.prisma.catTipoPropiedad.findMany({
            orderBy: { descripcion: 'asc' },
        });
    }
    async getCiudades() {
        return this.prisma.invCiudad.findMany({
            orderBy: { nombre: 'asc' },
        });
    }
};
exports.CatalogsService = CatalogsService;
exports.CatalogsService = CatalogsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CatalogsService);
//# sourceMappingURL=catalogs.service.js.map