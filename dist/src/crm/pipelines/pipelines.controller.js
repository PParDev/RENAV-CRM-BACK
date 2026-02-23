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
exports.PipelinesController = void 0;
const common_1 = require("@nestjs/common");
const pipelines_service_1 = require("./pipelines.service");
const create_pipeline_dto_1 = require("./dto/create-pipeline.dto");
const swagger_1 = require("@nestjs/swagger");
let PipelinesController = class PipelinesController {
    pipelinesService;
    constructor(pipelinesService) {
        this.pipelinesService = pipelinesService;
    }
    create(dto) {
        return this.pipelinesService.create(dto);
    }
    findAll() {
        return this.pipelinesService.findAll();
    }
    findOne(id) {
        return this.pipelinesService.findOne(id);
    }
    update(id, dto) {
        return this.pipelinesService.update(id, dto);
    }
    remove(id) {
        return this.pipelinesService.remove(id);
    }
};
exports.PipelinesController = PipelinesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pipeline_dto_1.CreatePipelineDto]),
    __metadata("design:returntype", void 0)
], PipelinesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PipelinesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PipelinesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_pipeline_dto_1.UpdatePipelineDto]),
    __metadata("design:returntype", void 0)
], PipelinesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PipelinesController.prototype, "remove", null);
exports.PipelinesController = PipelinesController = __decorate([
    (0, swagger_1.ApiTags)('pipelines'),
    (0, common_1.Controller)('pipelines'),
    __metadata("design:paramtypes", [pipelines_service_1.PipelinesService])
], PipelinesController);
//# sourceMappingURL=pipelines.controller.js.map