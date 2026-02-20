"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDevelopmentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_development_dto_1 = require("./create-development.dto");
class UpdateDevelopmentDto extends (0, swagger_1.PartialType)(create_development_dto_1.CreateDevelopmentDto) {
}
exports.UpdateDevelopmentDto = UpdateDevelopmentDto;
//# sourceMappingURL=update-development.dto.js.map