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
exports.SalesController = void 0;
const common_1 = require("@nestjs/common");
const sales_service_1 = require("./sales.service");
const create_apartado_dto_1 = require("./dto/create-apartado.dto");
const create_venta_dto_1 = require("./dto/create-venta.dto");
const swagger_1 = require("@nestjs/swagger");
let SalesController = class SalesController {
    salesService;
    constructor(salesService) {
        this.salesService = salesService;
    }
    createApartado(createApartadoDto) {
        return this.salesService.createApartado(createApartadoDto);
    }
    createVenta(createVentaDto) {
        return this.salesService.createVenta(createVentaDto);
    }
    findAllApartados(leadId) {
        return this.salesService.findAllApartados(leadId);
    }
    findAllVentas(leadId) {
        return this.salesService.findAllVentas(leadId);
    }
};
exports.SalesController = SalesController;
__decorate([
    (0, common_1.Post)('apartados'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_apartado_dto_1.CreateApartadoDto]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "createApartado", null);
__decorate([
    (0, common_1.Post)('ventas'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_venta_dto_1.CreateVentaDto]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "createVenta", null);
__decorate([
    (0, common_1.Get)('apartados'),
    (0, swagger_1.ApiQuery)({ name: 'leadId', required: false, type: Number }),
    __param(0, (0, common_1.Query)('leadId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "findAllApartados", null);
__decorate([
    (0, common_1.Get)('ventas'),
    (0, swagger_1.ApiQuery)({ name: 'leadId', required: false, type: Number }),
    __param(0, (0, common_1.Query)('leadId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "findAllVentas", null);
exports.SalesController = SalesController = __decorate([
    (0, swagger_1.ApiTags)('inventory-sales'),
    (0, common_1.Controller)('inventory/sales'),
    __metadata("design:paramtypes", [sales_service_1.SalesService])
], SalesController);
//# sourceMappingURL=sales.controller.js.map