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
exports.CatalogsController = void 0;
const common_1 = require("@nestjs/common");
const catalogs_service_1 = require("./catalogs.service");
const swagger_1 = require("@nestjs/swagger");
let CatalogsController = class CatalogsController {
    catalogsService;
    constructor(catalogsService) {
        this.catalogsService = catalogsService;
    }
    getServicios() {
        return this.catalogsService.getServicios();
    }
    getMetodosPago() {
        return this.catalogsService.getMetodosPago();
    }
    getTiposInmueble() {
        return this.catalogsService.getTiposInmueble();
    }
    getTiposProyecto() {
        return this.catalogsService.getTiposProyecto();
    }
    getSubtiposHabitacional() {
        return this.catalogsService.getSubtiposHabitacional();
    }
    getOrigenesProyecto() {
        return this.catalogsService.getOrigenesProyecto();
    }
    getEstadosUnidad() {
        return this.catalogsService.getEstadosUnidad();
    }
    getEstadosRelacionDesarrollador() {
        return this.catalogsService.getEstadosRelacionDesarrollador();
    }
    getNivelesCertezaLegal() {
        return this.catalogsService.getNivelesCertezaLegal();
    }
    getEstadosDocumentacion() {
        return this.catalogsService.getEstadosDocumentacion();
    }
    getTiposPropiedad() {
        return this.catalogsService.getTiposPropiedad();
    }
    getCiudades() {
        return this.catalogsService.getCiudades();
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
    (0, common_1.Get)('metodos-pago'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "getMetodosPago", null);
__decorate([
    (0, common_1.Get)('tipos-inmueble'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "getTiposInmueble", null);
__decorate([
    (0, common_1.Get)('tipos-proyecto'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "getTiposProyecto", null);
__decorate([
    (0, common_1.Get)('subtipos-habitacional'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "getSubtiposHabitacional", null);
__decorate([
    (0, common_1.Get)('origenes-proyecto'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "getOrigenesProyecto", null);
__decorate([
    (0, common_1.Get)('estados-unidad'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "getEstadosUnidad", null);
__decorate([
    (0, common_1.Get)('estados-relacion-desarrollador'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "getEstadosRelacionDesarrollador", null);
__decorate([
    (0, common_1.Get)('niveles-certeza-legal'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "getNivelesCertezaLegal", null);
__decorate([
    (0, common_1.Get)('estados-documentacion'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "getEstadosDocumentacion", null);
__decorate([
    (0, common_1.Get)('tipos-propiedad'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "getTiposPropiedad", null);
__decorate([
    (0, common_1.Get)('ciudades'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatalogsController.prototype, "getCiudades", null);
exports.CatalogsController = CatalogsController = __decorate([
    (0, swagger_1.ApiTags)('catalogs'),
    (0, common_1.Controller)('catalogs'),
    __metadata("design:paramtypes", [catalogs_service_1.CatalogsService])
], CatalogsController);
//# sourceMappingURL=catalogs.controller.js.map