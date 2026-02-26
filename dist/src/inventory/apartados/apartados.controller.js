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
exports.ApartadosController = void 0;
const common_1 = require("@nestjs/common");
const apartados_service_1 = require("./apartados.service");
const create_apartado_dto_1 = require("./dto/create-apartado.dto");
const update_apartado_dto_1 = require("./dto/update-apartado.dto");
let ApartadosController = class ApartadosController {
    apartadosService;
    constructor(apartadosService) {
        this.apartadosService = apartadosService;
    }
    create(createApartadoDto) {
        return this.apartadosService.create(createApartadoDto);
    }
    findAll(skip, take, id_unidad, id_lead, status) {
        let statusParsed = undefined;
        if (status !== undefined) {
            statusParsed = status === 'true';
        }
        return this.apartadosService.findAll(skip ? +skip : undefined, take ? +take : undefined, id_unidad ? +id_unidad : undefined, id_lead ? +id_lead : undefined, statusParsed);
    }
    findOne(id) {
        return this.apartadosService.findOne(id);
    }
    update(id, updateApartadoDto) {
        return this.apartadosService.update(id, updateApartadoDto);
    }
    remove(id) {
        return this.apartadosService.remove(id);
    }
};
exports.ApartadosController = ApartadosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_apartado_dto_1.CreateApartadoDto]),
    __metadata("design:returntype", void 0)
], ApartadosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('skip')),
    __param(1, (0, common_1.Query)('take')),
    __param(2, (0, common_1.Query)('id_unidad')),
    __param(3, (0, common_1.Query)('id_lead')),
    __param(4, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], ApartadosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ApartadosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_apartado_dto_1.UpdateApartadoDto]),
    __metadata("design:returntype", void 0)
], ApartadosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ApartadosController.prototype, "remove", null);
exports.ApartadosController = ApartadosController = __decorate([
    (0, common_1.Controller)('inventory/apartados'),
    __metadata("design:paramtypes", [apartados_service_1.ApartadosService])
], ApartadosController);
//# sourceMappingURL=apartados.controller.js.map