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
exports.CreateServiceRequestDto = exports.CreateBienesRaicesDto = exports.CreateAvaluoDto = exports.CreateConstruccionDto = exports.CreateArquitecturaDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateArquitecturaDto {
    frente_m;
    fondo_m;
    superficie_m2;
    ubicacion;
    zona;
    conoce_compatibilidad_urbanistica;
    id_tipo_proyecto;
    id_subtipo_habitacional;
    proyectar_y_construir_inmediato;
}
exports.CreateArquitecturaDto = CreateArquitecturaDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateArquitecturaDto.prototype, "frente_m", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateArquitecturaDto.prototype, "fondo_m", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateArquitecturaDto.prototype, "superficie_m2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateArquitecturaDto.prototype, "ubicacion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateArquitecturaDto.prototype, "zona", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateArquitecturaDto.prototype, "conoce_compatibilidad_urbanistica", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateArquitecturaDto.prototype, "id_tipo_proyecto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateArquitecturaDto.prototype, "id_subtipo_habitacional", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateArquitecturaDto.prototype, "proyectar_y_construir_inmediato", void 0);
class CreateConstruccionDto {
    tiene_proyecto;
    frente_m;
    fondo_m;
    superficie_m2;
    ubicacion;
    zona;
    conoce_compatibilidad_urbanistica;
    id_tipo_proyecto;
    id_subtipo_habitacional;
    construccion_inmediata;
}
exports.CreateConstruccionDto = CreateConstruccionDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateConstruccionDto.prototype, "tiene_proyecto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateConstruccionDto.prototype, "frente_m", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateConstruccionDto.prototype, "fondo_m", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateConstruccionDto.prototype, "superficie_m2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateConstruccionDto.prototype, "ubicacion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateConstruccionDto.prototype, "zona", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateConstruccionDto.prototype, "conoce_compatibilidad_urbanistica", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateConstruccionDto.prototype, "id_tipo_proyecto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateConstruccionDto.prototype, "id_subtipo_habitacional", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateConstruccionDto.prototype, "construccion_inmediata", void 0);
class CreateAvaluoDto {
    tipo_bien;
    ubicacion;
    zona;
    frente_m;
    fondo_m;
    superficie_m2;
    terreno_topografia;
    terreno_forma;
    superficie_construida_m2;
    fecha_visita;
    temporalidad_entrega;
}
exports.CreateAvaluoDto = CreateAvaluoDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAvaluoDto.prototype, "tipo_bien", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAvaluoDto.prototype, "ubicacion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAvaluoDto.prototype, "zona", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateAvaluoDto.prototype, "frente_m", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateAvaluoDto.prototype, "fondo_m", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateAvaluoDto.prototype, "superficie_m2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAvaluoDto.prototype, "terreno_topografia", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAvaluoDto.prototype, "terreno_forma", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateAvaluoDto.prototype, "superficie_construida_m2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAvaluoDto.prototype, "fecha_visita", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAvaluoDto.prototype, "temporalidad_entrega", void 0);
class CreateBienesRaicesDto {
    id_tipo_inmueble;
    ciudad;
    zona;
    ubicacion;
    frente_m;
    fondo_m;
    superficie_m2;
    recamaras;
    banos;
    estacionamientos;
    m2_construidos_requeridos;
}
exports.CreateBienesRaicesDto = CreateBienesRaicesDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateBienesRaicesDto.prototype, "id_tipo_inmueble", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBienesRaicesDto.prototype, "ciudad", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBienesRaicesDto.prototype, "zona", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBienesRaicesDto.prototype, "ubicacion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateBienesRaicesDto.prototype, "frente_m", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateBienesRaicesDto.prototype, "fondo_m", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateBienesRaicesDto.prototype, "superficie_m2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateBienesRaicesDto.prototype, "recamaras", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateBienesRaicesDto.prototype, "banos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateBienesRaicesDto.prototype, "estacionamientos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateBienesRaicesDto.prototype, "m2_construidos_requeridos", void 0);
class CreateServiceRequestDto {
    id_lead;
    id_servicio;
    presupuesto_min;
    presupuesto_max;
    id_metodo_pago;
    ciudad;
    zona;
    ubicacion_texto;
    arquitectura;
    construccion;
    avaluo;
    bienes_raices;
}
exports.CreateServiceRequestDto = CreateServiceRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateServiceRequestDto.prototype, "id_lead", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateServiceRequestDto.prototype, "id_servicio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateServiceRequestDto.prototype, "presupuesto_min", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateServiceRequestDto.prototype, "presupuesto_max", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateServiceRequestDto.prototype, "id_metodo_pago", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateServiceRequestDto.prototype, "ciudad", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateServiceRequestDto.prototype, "zona", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateServiceRequestDto.prototype, "ubicacion_texto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CreateArquitecturaDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreateArquitecturaDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", CreateArquitecturaDto)
], CreateServiceRequestDto.prototype, "arquitectura", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CreateConstruccionDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreateConstruccionDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", CreateConstruccionDto)
], CreateServiceRequestDto.prototype, "construccion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CreateAvaluoDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreateAvaluoDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", CreateAvaluoDto)
], CreateServiceRequestDto.prototype, "avaluo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CreateBienesRaicesDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreateBienesRaicesDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", CreateBienesRaicesDto)
], CreateServiceRequestDto.prototype, "bienes_raices", void 0);
//# sourceMappingURL=create-service-request.dto.js.map