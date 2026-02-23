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
    async createServicio(data) {
        return this.prisma.catServicios.create({ data });
    }
    async updateServicio(id, data) {
        return this.prisma.catServicios.update({ where: { id_servicio: id }, data });
    }
    async deleteServicio(id) {
        return this.prisma.catServicios.delete({ where: { id_servicio: id } });
    }
    async getMetodosPago() {
        return this.prisma.catMetodoPago.findMany({
            orderBy: { nombre: 'asc' },
        });
    }
    async createMetodoPago(data) {
        return this.prisma.catMetodoPago.create({ data });
    }
    async updateMetodoPago(id, data) {
        return this.prisma.catMetodoPago.update({ where: { id_metodo_pago: id }, data });
    }
    async deleteMetodoPago(id) {
        return this.prisma.catMetodoPago.delete({ where: { id_metodo_pago: id } });
    }
    async getTiposInmueble() {
        return this.prisma.catTipoInmueble.findMany({
            orderBy: { nombre: 'asc' },
        });
    }
    async createTipoInmueble(data) {
        return this.prisma.catTipoInmueble.create({ data });
    }
    async updateTipoInmueble(id, data) {
        return this.prisma.catTipoInmueble.update({ where: { id_tipo_inmueble: id }, data });
    }
    async deleteTipoInmueble(id) {
        return this.prisma.catTipoInmueble.delete({ where: { id_tipo_inmueble: id } });
    }
    async getTiposProyecto() {
        return this.prisma.catTipoProyecto.findMany({
            orderBy: { nombre: 'asc' },
        });
    }
    async createTipoProyecto(data) {
        return this.prisma.catTipoProyecto.create({ data });
    }
    async updateTipoProyecto(id, data) {
        return this.prisma.catTipoProyecto.update({ where: { id_tipo_proyecto: id }, data });
    }
    async deleteTipoProyecto(id) {
        return this.prisma.catTipoProyecto.delete({ where: { id_tipo_proyecto: id } });
    }
    async getSubtiposHabitacional() {
        return this.prisma.catSubtipoHabitacional.findMany({
            orderBy: { nombre: 'asc' },
        });
    }
    async createSubtipoHabitacional(data) {
        return this.prisma.catSubtipoHabitacional.create({ data });
    }
    async updateSubtipoHabitacional(id, data) {
        return this.prisma.catSubtipoHabitacional.update({ where: { id_subtipo: id }, data });
    }
    async deleteSubtipoHabitacional(id) {
        return this.prisma.catSubtipoHabitacional.delete({ where: { id_subtipo: id } });
    }
    async getOrigenesProyecto() {
        return this.prisma.catOrigenProyecto.findMany({
            orderBy: { nombre: 'asc' },
        });
    }
    async createOrigenProyecto(data) {
        return this.prisma.catOrigenProyecto.create({ data });
    }
    async updateOrigenProyecto(id, data) {
        return this.prisma.catOrigenProyecto.update({ where: { id_origen_proyecto: id }, data });
    }
    async deleteOrigenProyecto(id) {
        return this.prisma.catOrigenProyecto.delete({ where: { id_origen_proyecto: id } });
    }
    async getEstadosUnidad() {
        return this.prisma.catEstadoUnidad.findMany({
            orderBy: { nombre: 'asc' },
        });
    }
    async createEstadoUnidad(data) {
        return this.prisma.catEstadoUnidad.create({ data });
    }
    async updateEstadoUnidad(id, data) {
        return this.prisma.catEstadoUnidad.update({ where: { id_estado_unidad: id }, data });
    }
    async deleteEstadoUnidad(id) {
        return this.prisma.catEstadoUnidad.delete({ where: { id_estado_unidad: id } });
    }
    async getEstadosRelacionDesarrollador() {
        return this.prisma.catEstadoRelacionDesarrollador.findMany({
            orderBy: { nombre: 'asc' },
        });
    }
    async createEstadoRelacionDesarrollador(data) {
        return this.prisma.catEstadoRelacionDesarrollador.create({ data });
    }
    async updateEstadoRelacionDesarrollador(id, data) {
        return this.prisma.catEstadoRelacionDesarrollador.update({ where: { id_estado: id }, data });
    }
    async deleteEstadoRelacionDesarrollador(id) {
        return this.prisma.catEstadoRelacionDesarrollador.delete({ where: { id_estado: id } });
    }
    async getNivelesCertezaLegal() {
        return this.prisma.catNivelCertezaLegal.findMany({
            orderBy: { nombre: 'asc' },
        });
    }
    async createNivelCertezaLegal(data) {
        return this.prisma.catNivelCertezaLegal.create({ data });
    }
    async updateNivelCertezaLegal(id, data) {
        return this.prisma.catNivelCertezaLegal.update({ where: { id_nivel: id }, data });
    }
    async deleteNivelCertezaLegal(id) {
        return this.prisma.catNivelCertezaLegal.delete({ where: { id_nivel: id } });
    }
    async getEstadosDocumentacion() {
        return this.prisma.catEstadoDocumentacion.findMany({
            orderBy: { nombre: 'asc' },
        });
    }
    async createEstadoDocumentacion(data) {
        return this.prisma.catEstadoDocumentacion.create({ data });
    }
    async updateEstadoDocumentacion(id, data) {
        return this.prisma.catEstadoDocumentacion.update({ where: { id_estado_doc: id }, data });
    }
    async deleteEstadoDocumentacion(id) {
        return this.prisma.catEstadoDocumentacion.delete({ where: { id_estado_doc: id } });
    }
    async getTiposPropiedad() {
        return this.prisma.catTipoPropiedad.findMany({
            orderBy: { descripcion: 'asc' },
        });
    }
    async createTipoPropiedad(data) {
        return this.prisma.catTipoPropiedad.create({ data });
    }
    async updateTipoPropiedad(id, data) {
        return this.prisma.catTipoPropiedad.update({ where: { id_tipo_propiedad: id }, data });
    }
    async deleteTipoPropiedad(id) {
        return this.prisma.catTipoPropiedad.delete({ where: { id_tipo_propiedad: id } });
    }
    async getCiudades() {
        return this.prisma.invCiudad.findMany({
            orderBy: { nombre: 'asc' },
        });
    }
    async createCiudad(data) {
        return this.prisma.invCiudad.create({ data });
    }
    async updateCiudad(id, data) {
        return this.prisma.invCiudad.update({ where: { id_inv_ciudad: id }, data });
    }
    async deleteCiudad(id) {
        return this.prisma.invCiudad.delete({ where: { id_inv_ciudad: id } });
    }
};
exports.CatalogsService = CatalogsService;
exports.CatalogsService = CatalogsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CatalogsService);
//# sourceMappingURL=catalogs.service.js.map