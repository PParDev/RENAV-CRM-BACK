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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogsController = void 0;
const common_1 = require("@nestjs/common");
const catalogs_service_1 = require("./catalogs.service");
const swagger_1 = require("@nestjs/swagger");
const catalog_dto_1 = require("./dto/catalog.dto");
let CatalogsController = class CatalogsController {
    catalogsService;
    constructor(catalogsService) {
        this.catalogsService = catalogsService;
    }
    getServicios() {
        return this.catalogsService.getServicios();
    }
    createServicio(data) {
        return this.catalogsService.createServicio(data);
    }
    updateServicio(id, data) {
        return this.catalogsService.updateServicio(id, data);
    }
    deleteServicio(id) {
        return this.catalogsService.deleteServicio(id);
    }
    getMetodosPago() {
        return this.catalogsService.getMetodosPago();
    }
    createMetodoPago(data) {
        return this.catalogsService.createMetodoPago(data);
    }
    updateMetodoPago(id, data) {
        return this.catalogsService.updateMetodoPago(id, data);
    }
    deleteMetodoPago(id) {
        return this.catalogsService.deleteMetodoPago(id);
    }
    getTiposInmueble() {
        return this.catalogsService.getTiposInmueble();
    }
    createTipoInmueble(data) {
        return this.catalogsService.createTipoInmueble(data);
    }
    updateTipoInmueble(id, data) {
        return this.catalogsService.updateTipoInmueble(id, data);
    }
    deleteTipoInmueble(id) {
        return this.catalogsService.deleteTipoInmueble(id);
    }
    getTiposProyecto() {
        return this.catalogsService.getTiposProyecto();
    }
    createTipoProyecto(data) {
        return this.catalogsService.createTipoProyecto(data);
    }
    updateTipoProyecto(id, data) {
        return this.catalogsService.updateTipoProyecto(id, data);
    }
    deleteTipoProyecto(id) {
        return this.catalogsService.deleteTipoProyecto(id);
    }
    getSubtiposHabitacional() {
        return this.catalogsService.getSubtiposHabitacional();
    }
    createSubtipoHabitacional(data) {
        return this.catalogsService.createSubtipoHabitacional(data);
    }
    updateSubtipoHabitacional(id, data) {
        return this.catalogsService.updateSubtipoHabitacional(id, data);
    }
    deleteSubtipoHabitacional(id) {
        return this.catalogsService.deleteSubtipoHabitacional(id);
    }
    getOrigenesProyecto() {
        return this.catalogsService.getOrigenesProyecto();
    }
    createOrigenProyecto(data) {
        return this.catalogsService.createOrigenProyecto(data);
    }
    updateOrigenProyecto(id, data) {
        return this.catalogsService.updateOrigenProyecto(id, data);
    }
    deleteOrigenProyecto(id) {
        return this.catalogsService.deleteOrigenProyecto(id);
    }
    getEstadosUnidad() {
        return this.catalogsService.getEstadosUnidad();
    }
    createEstadoUnidad(data) {
        return this.catalogsService.createEstadoUnidad(data);
    }
    updateEstadoUnidad(id, data) {
        return this.catalogsService.updateEstadoUnidad(id, data);
    }
    deleteEstadoUnidad(id) {
        return this.catalogsService.deleteEstadoUnidad(id);
    }
    getEstadosRelacionDesarrollador() {
        return this.catalogsService.getEstadosRelacionDesarrollador();
    }
    createEstadoRelacionDesarrollador(data) {
        return this.catalogsService.createEstadoRelacionDesarrollador(data);
    }
    updateEstadoRelacionDesarrollador(id, data) {
        return this.catalogsService.updateEstadoRelacionDesarrollador(id, data);
    }
    deleteEstadoRelacionDesarrollador(id) {
        return this.catalogsService.deleteEstadoRelacionDesarrollador(id);
    }
    getNivelesCertezaLegal() {
        return this.catalogsService.getNivelesCertezaLegal();
    }
    createNivelCertezaLegal(data) {
        return this.catalogsService.createNivelCertezaLegal(data);
    }
    updateNivelCertezaLegal(id, data) {
        return this.catalogsService.updateNivelCertezaLegal(id, data);
    }
    deleteNivelCertezaLegal(id) {
        return this.catalogsService.deleteNivelCertezaLegal(id);
    }
    getEstadosDocumentacion() {
        return this.catalogsService.getEstadosDocumentacion();
    }
    createEstadoDocumentacion(data) {
        return this.catalogsService.createEstadoDocumentacion(data);
    }
    updateEstadoDocumentacion(id, data) {
        return this.catalogsService.updateEstadoDocumentacion(id, data);
    }
    deleteEstadoDocumentacion(id) {
        return this.catalogsService.deleteEstadoDocumentacion(id);
    }
    getTiposPropiedad() {
        return this.catalogsService.getTiposPropiedad();
    }
    createTipoPropiedad(data) {
        return this.catalogsService.createTipoPropiedad(data);
    }
    updateTipoPropiedad(id, data) {
        return this.catalogsService.updateTipoPropiedad(id, data);
    }
    deleteTipoPropiedad(id) {
        return this.catalogsService.deleteTipoPropiedad(id);
    }
    getCiudades() {
        return this.catalogsService.getCiudades();
    }
    createCiudad(data) {
        return this.catalogsService.createCiudad(data);
    }
    updateCiudad(id, data) {
        return this.catalogsService.updateCiudad(id, data);
    }
    deleteCiudad(id) {
        return this.catalogsService.deleteCiudad(id);
    }
};
exports.CatalogsController = CatalogsController;
__decorate([
    (0, common_1.Get)('servicios'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "getServicios", null);
__decorate([
    (0, common_1.Post)('servicios'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [catalog_dto_1.CreateServicioDto]),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "createServicio", null);
__decorate([
    (0, common_1.Patch)('servicios/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, catalog_dto_1.UpdateServicioDto]),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "updateServicio", null);
__decorate([
    (0, common_1.Delete)('servicios/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "deleteServicio", null);
__decorate([
    (0, common_1.Get)('metodos-pago'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "getMetodosPago", null);
__decorate([
    (0, common_1.Post)('metodos-pago'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [catalog_dto_1.CreateBaseCatalogDto]),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "createMetodoPago", null);
__decorate([
    (0, common_1.Patch)('metodos-pago/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, catalog_dto_1.UpdateBaseCatalogDto]),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "updateMetodoPago", null);
__decorate([
    (0, common_1.Delete)('metodos-pago/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "deleteMetodoPago", null);
__decorate([
    (0, common_1.Get)('tipos-inmueble'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "getTiposInmueble", null);
__decorate([
    (0, common_1.Post)('tipos-inmueble'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [catalog_dto_1.CreateBaseCatalogDto]),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "createTipoInmueble", null);
__decorate([
    (0, common_1.Patch)('tipos-inmueble/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, catalog_dto_1.UpdateBaseCatalogDto]),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "updateTipoInmueble", null);
__decorate([
    (0, common_1.Delete)('tipos-inmueble/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "deleteTipoInmueble", null);
__decorate([
    (0, common_1.Get)('tipos-proyecto'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "getTiposProyecto", null);
__decorate([
    (0, common_1.Post)('tipos-proyecto'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [catalog_dto_1.CreateBaseCatalogDto]),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "createTipoProyecto", null);
__decorate([
    (0, common_1.Patch)('tipos-proyecto/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, catalog_dto_1.UpdateBaseCatalogDto]),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "updateTipoProyecto", null);
__decorate([
    (0, common_1.Delete)('tipos-proyecto/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "deleteTipoProyecto", null);
__decorate([
    (0, common_1.Get)('subtipos-habitacional'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "getSubtiposHabitacional", null);
__decorate([
    (0, common_1.Post)('subtipos-habitacional'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [catalog_dto_1.CreateBaseCatalogDto]),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "createSubtipoHabitacional", null);
__decorate([
    (0, common_1.Patch)('subtipos-habitacional/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, catalog_dto_1.UpdateBaseCatalogDto]),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "updateSubtipoHabitacional", null);
__decorate([
    (0, common_1.Delete)('subtipos-habitacional/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "deleteSubtipoHabitacional", null);
__decorate([
    (0, common_1.Get)('origenes-proyecto'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "getOrigenesProyecto", null);
__decorate([
    (0, common_1.Post)('origenes-proyecto'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [catalog_dto_1.CreateBaseCatalogDto]),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "createOrigenProyecto", null);
__decorate([
    (0, common_1.Patch)('origenes-proyecto/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, catalog_dto_1.UpdateBaseCatalogDto]),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "updateOrigenProyecto", null);
__decorate([
    (0, common_1.Delete)('origenes-proyecto/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "deleteOrigenProyecto", null);
__decorate([
    (0, common_1.Get)('estados-unidad'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "getEstadosUnidad", null);
__decorate([
    (0, common_1.Post)('estados-unidad'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [catalog_dto_1.CreateBaseCatalogDto]),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "createEstadoUnidad", null);
__decorate([
    (0, common_1.Patch)('estados-unidad/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, catalog_dto_1.UpdateBaseCatalogDto]),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "updateEstadoUnidad", null);
__decorate([
    (0, common_1.Delete)('estados-unidad/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "deleteEstadoUnidad", null);
__decorate([
    (0, common_1.Get)('estados-relacion-desarrollador'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "getEstadosRelacionDesarrollador", null);
__decorate([
    (0, common_1.Post)('estados-relacion-desarrollador'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [catalog_dto_1.CreateBaseCatalogDto]),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "createEstadoRelacionDesarrollador", null);
__decorate([
    (0, common_1.Patch)('estados-relacion-desarrollador/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, catalog_dto_1.UpdateBaseCatalogDto]),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "updateEstadoRelacionDesarrollador", null);
__decorate([
    (0, common_1.Delete)('estados-relacion-desarrollador/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "deleteEstadoRelacionDesarrollador", null);
__decorate([
    (0, common_1.Get)('niveles-certeza-legal'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "getNivelesCertezaLegal", null);
__decorate([
    (0, common_1.Post)('niveles-certeza-legal'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [catalog_dto_1.CreateBaseCatalogDto]),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "createNivelCertezaLegal", null);
__decorate([
    (0, common_1.Patch)('niveles-certeza-legal/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, catalog_dto_1.UpdateBaseCatalogDto]),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "updateNivelCertezaLegal", null);
__decorate([
    (0, common_1.Delete)('niveles-certeza-legal/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "deleteNivelCertezaLegal", null);
__decorate([
    (0, common_1.Get)('estados-documentacion'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "getEstadosDocumentacion", null);
__decorate([
    (0, common_1.Post)('estados-documentacion'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [catalog_dto_1.CreateBaseCatalogDto]),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "createEstadoDocumentacion", null);
__decorate([
    (0, common_1.Patch)('estados-documentacion/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, catalog_dto_1.UpdateBaseCatalogDto]),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "updateEstadoDocumentacion", null);
__decorate([
    (0, common_1.Delete)('estados-documentacion/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "deleteEstadoDocumentacion", null);
__decorate([
    (0, common_1.Get)('tipos-propiedad'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "getTiposPropiedad", null);
__decorate([
    (0, common_1.Post)('tipos-propiedad'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [catalog_dto_1.CreateTipoPropiedadDto]),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "createTipoPropiedad", null);
__decorate([
    (0, common_1.Patch)('tipos-propiedad/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, catalog_dto_1.UpdateTipoPropiedadDto]),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "updateTipoPropiedad", null);
__decorate([
    (0, common_1.Delete)('tipos-propiedad/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "deleteTipoPropiedad", null);
__decorate([
    (0, common_1.Get)('ciudades'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "getCiudades", null);
__decorate([
    (0, common_1.Post)('ciudades'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [catalog_dto_1.CreateCiudadDto]),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "createCiudad", null);
__decorate([
    (0, common_1.Patch)('ciudades/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, catalog_dto_1.UpdateCiudadDto]),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "updateCiudad", null);
__decorate([
    (0, common_1.Delete)('ciudades/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "deleteCiudad", null);
exports.CatalogsController = CatalogsController = __decorate([
    (0, swagger_1.ApiTags)('catalogs'),
    (0, common_1.Controller)('catalogs'),
    __metadata("design:paramtypes", [catalogs_service_1.CatalogsService])
], CatalogsController);
//# sourceMappingURL=catalogs.controller.js.map