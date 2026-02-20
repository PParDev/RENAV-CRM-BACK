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
exports.DevelopmentsController = void 0;
const common_1 = require("@nestjs/common");
const developments_service_1 = require("./developments.service");
const create_development_dto_1 = require("./dto/create-development.dto");
const update_development_dto_1 = require("./dto/update-development.dto");
const create_typology_dto_1 = require("./dto/create-typology.dto");
const swagger_1 = require("@nestjs/swagger");
let DevelopmentsController = class DevelopmentsController {
    developmentsService;
    constructor(developmentsService) {
        this.developmentsService = developmentsService;
    }
    create(createDevelopmentDto) {
        return this.developmentsService.create(createDevelopmentDto);
    }
    addTypology(id, createTypologyDto) {
        return this.developmentsService.addTypology(id, createTypologyDto);
    }
    findAll(skip, take, ciudad, desarrollador, search) {
        return this.developmentsService.findAll(skip, take, ciudad ? +ciudad : undefined, desarrollador ? +desarrollador : undefined, search);
    }
    findOne(id) {
        return this.developmentsService.findOne(id);
    }
    update(id, updateDevelopmentDto) {
        return this.developmentsService.update(id, updateDevelopmentDto);
    }
    remove(id) {
        return this.developmentsService.remove(id);
    }
};
exports.DevelopmentsController = DevelopmentsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_development_dto_1.CreateDevelopmentDto]),
    __metadata("design:returntype", void 0)
], DevelopmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/typologies'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_typology_dto_1.CreateTypologyDto]),
    __metadata("design:returntype", void 0)
], DevelopmentsController.prototype, "addTypology", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiQuery)({ name: 'skip', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'take', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'ciudad', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'desarrollador', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String }),
    __param(0, (0, common_1.Query)('skip', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('take', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('ciudad')),
    __param(3, (0, common_1.Query)('desarrollador')),
    __param(4, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Number, String]),
    __metadata("design:returntype", void 0)
], DevelopmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DevelopmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_development_dto_1.UpdateDevelopmentDto]),
    __metadata("design:returntype", void 0)
], DevelopmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DevelopmentsController.prototype, "remove", null);
exports.DevelopmentsController = DevelopmentsController = __decorate([
    (0, swagger_1.ApiTags)('inventory-developments'),
    (0, common_1.Controller)('inventory/developments'),
    __metadata("design:paramtypes", [developments_service_1.DevelopmentsService])
], DevelopmentsController);
//# sourceMappingURL=developments.controller.js.map