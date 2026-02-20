"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDeveloperDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_developer_dto_1 = require("./create-developer.dto");
class UpdateDeveloperDto extends (0, swagger_1.PartialType)(create_developer_dto_1.CreateDeveloperDto) {
}
exports.UpdateDeveloperDto = UpdateDeveloperDto;
//# sourceMappingURL=update-developer.dto.js.map