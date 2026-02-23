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
exports.CreateLeadDto = exports.LeadPriority = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var LeadPriority;
(function (LeadPriority) {
    LeadPriority["BAJA"] = "BAJA";
    LeadPriority["MEDIA"] = "MEDIA";
    LeadPriority["ALTA"] = "ALTA";
    LeadPriority["URGENTE"] = "URGENTE";
})(LeadPriority || (exports.LeadPriority = LeadPriority = {}));
class CreateLeadDto {
    id_contacto;
    id_servicio_principal;
    estado;
    prioridad;
    id_usuario_asignado;
    notas_iniciales;
}
exports.CreateLeadDto = CreateLeadDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateLeadDto.prototype, "id_contacto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateLeadDto.prototype, "id_servicio_principal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "estado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: LeadPriority, default: LeadPriority.MEDIA }),
    (0, class_validator_1.IsEnum)(LeadPriority),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "prioridad", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateLeadDto.prototype, "id_usuario_asignado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "notas_iniciales", void 0);
//# sourceMappingURL=create-lead.dto.js.map