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
exports.TypologiesController = void 0;
const common_1 = require("@nestjs/common");
const typologies_service_1 = require("./typologies.service");
const create_typology_dto_1 = require("./dto/create-typology.dto");
const update_typology_dto_1 = require("./dto/update-typology.dto");
let TypologiesController = class TypologiesController {
    typologiesService;
    constructor(typologiesService) {
        this.typologiesService = typologiesService;
    }
    create(createTypologyDto) {
        return this.typologiesService.create(createTypologyDto);
    }
    findAll(skip, take, id_desarrollo, search) {
        return this.typologiesService.findAll(skip ? +skip : undefined, take ? +take : undefined, id_desarrollo ? +id_desarrollo : undefined, search);
    }
    findOne(id) {
        return this.typologiesService.findOne(id);
    }
    update(id, updateTypologyDto) {
        return this.typologiesService.update(id, updateTypologyDto);
    }
    remove(id) {
        return this.typologiesService.remove(id);
    }
};
exports.TypologiesController = TypologiesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_typology_dto_1.CreateTypologyDto]),
    __metadata("design:returntype", void 0)
], TypologiesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('skip')),
    __param(1, (0, common_1.Query)('take')),
    __param(2, (0, common_1.Query)('id_desarrollo')),
    __param(3, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], TypologiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TypologiesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_typology_dto_1.UpdateTypologyDto]),
    __metadata("design:returntype", void 0)
], TypologiesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TypologiesController.prototype, "remove", null);
exports.TypologiesController = TypologiesController = __decorate([
    (0, common_1.Controller)('inventory/typologies'),
    __metadata("design:paramtypes", [typologies_service_1.TypologiesService])
], TypologiesController);
//# sourceMappingURL=typologies.controller.js.map