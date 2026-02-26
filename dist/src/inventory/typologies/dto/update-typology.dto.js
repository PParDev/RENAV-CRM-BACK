"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTypologyDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_typology_dto_1 = require("./create-typology.dto");
class UpdateTypologyDto extends (0, mapped_types_1.PartialType)(create_typology_dto_1.CreateTypologyDto) {
}
exports.UpdateTypologyDto = UpdateTypologyDto;
//# sourceMappingURL=update-typology.dto.js.map