"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateApartadoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_apartado_dto_1 = require("./create-apartado.dto");
class UpdateApartadoDto extends (0, mapped_types_1.PartialType)(create_apartado_dto_1.CreateApartadoDto) {
}
exports.UpdateApartadoDto = UpdateApartadoDto;
//# sourceMappingURL=update-apartado.dto.js.map