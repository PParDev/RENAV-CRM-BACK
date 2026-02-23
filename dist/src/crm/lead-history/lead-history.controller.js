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
exports.LeadHistoryController = void 0;
const common_1 = require("@nestjs/common");
const lead_history_service_1 = require("./lead-history.service");
const create_lead_history_dto_1 = require("./dto/create-lead-history.dto");
const swagger_1 = require("@nestjs/swagger");
let LeadHistoryController = class LeadHistoryController {
    leadHistoryService;
    constructor(leadHistoryService) {
        this.leadHistoryService = leadHistoryService;
    }
    create(dto) {
        return this.leadHistoryService.create(dto);
    }
    findAll(leadId) {
        return this.leadHistoryService.findAll(leadId ? Number(leadId) : undefined);
    }
    findOne(id) {
        return this.leadHistoryService.findOne(id);
    }
    update(id, dto) {
        return this.leadHistoryService.update(id, dto);
    }
    remove(id) {
        return this.leadHistoryService.remove(id);
    }
};
exports.LeadHistoryController = LeadHistoryController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lead_history_dto_1.CreateLeadHistoryDto]),
    __metadata("design:returntype", void 0)
], LeadHistoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiQuery)({ name: 'leadId', required: false, type: Number }),
    __param(0, (0, common_1.Query)('leadId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LeadHistoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LeadHistoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_lead_history_dto_1.UpdateLeadHistoryDto]),
    __metadata("design:returntype", void 0)
], LeadHistoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LeadHistoryController.prototype, "remove", null);
exports.LeadHistoryController = LeadHistoryController = __decorate([
    (0, swagger_1.ApiTags)('lead-history'),
    (0, common_1.Controller)('lead-history'),
    __metadata("design:paramtypes", [lead_history_service_1.LeadHistoryService])
], LeadHistoryController);
//# sourceMappingURL=lead-history.controller.js.map