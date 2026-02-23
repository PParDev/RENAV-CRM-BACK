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
exports.UpdateCiudadDto = exports.CreateCiudadDto = exports.UpdateTipoPropiedadDto = exports.CreateTipoPropiedadDto = exports.UpdateServicioDto = exports.CreateServicioDto = exports.UpdateBaseCatalogDto = exports.CreateBaseCatalogDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateBaseCatalogDto {
    codigo;
    nombre;
}
exports.CreateBaseCatalogDto = CreateBaseCatalogDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBaseCatalogDto.prototype, "codigo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBaseCatalogDto.prototype, "nombre", void 0);
class UpdateBaseCatalogDto extends (0, swagger_1.PartialType)(CreateBaseCatalogDto) {
}
exports.UpdateBaseCatalogDto = UpdateBaseCatalogDto;
class CreateServicioDto extends CreateBaseCatalogDto {
    activo;
}
exports.CreateServicioDto = CreateServicioDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, default: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateServicioDto.prototype, "activo", void 0);
class UpdateServicioDto extends (0, swagger_1.PartialType)(CreateServicioDto) {
}
exports.UpdateServicioDto = UpdateServicioDto;
class CreateTipoPropiedadDto {
    tenencia;
    uso;
    tipologia;
    descripcion;
}
exports.CreateTipoPropiedadDto = CreateTipoPropiedadDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTipoPropiedadDto.prototype, "tenencia", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTipoPropiedadDto.prototype, "uso", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTipoPropiedadDto.prototype, "tipologia", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTipoPropiedadDto.prototype, "descripcion", void 0);
class UpdateTipoPropiedadDto extends (0, swagger_1.PartialType)(CreateTipoPropiedadDto) {
}
exports.UpdateTipoPropiedadDto = UpdateTipoPropiedadDto;
class CreateCiudadDto {
    nombre;
    estado;
    codigo;
}
exports.CreateCiudadDto = CreateCiudadDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCiudadDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCiudadDto.prototype, "estado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCiudadDto.prototype, "codigo", void 0);
class UpdateCiudadDto extends (0, swagger_1.PartialType)(CreateCiudadDto) {
}
exports.UpdateCiudadDto = UpdateCiudadDto;
//# sourceMappingURL=catalog.dto.js.map