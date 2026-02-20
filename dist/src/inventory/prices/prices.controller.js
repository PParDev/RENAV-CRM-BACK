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
exports.PricesController = void 0;
const common_1 = require("@nestjs/common");
const prices_service_1 = require("./prices.service");
const create_price_history_dto_1 = require("./dto/create-price-history.dto");
const swagger_1 = require("@nestjs/swagger");
let PricesController = class PricesController {
    pricesService;
    constructor(pricesService) {
        this.pricesService = pricesService;
    }
    addPriceToUnit(id, dto) {
        return this.pricesService.addPriceToUnit(id, dto);
    }
    getPriceHistory(id) {
        return this.pricesService.getPriceHistory(id);
    }
};
exports.PricesController = PricesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_price_history_dto_1.CreatePriceHistoryDto]),
    __metadata("design:returntype", void 0)
], PricesController.prototype, "addPriceToUnit", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PricesController.prototype, "getPriceHistory", null);
exports.PricesController = PricesController = __decorate([
    (0, swagger_1.ApiTags)('inventory-prices'),
    (0, common_1.Controller)('inventory/units/:id/prices'),
    __metadata("design:paramtypes", [prices_service_1.PricesService])
], PricesController);
//# sourceMappingURL=prices.controller.js.map