"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryModule = void 0;
const common_1 = require("@nestjs/common");
const developers_module_1 = require("./developers/developers.module");
const developments_module_1 = require("./developments/developments.module");
const units_module_1 = require("./units/units.module");
const sales_module_1 = require("./sales/sales.module");
const prices_module_1 = require("./prices/prices.module");
const cities_module_1 = require("./cities/cities.module");
let InventoryModule = class InventoryModule {
};
exports.InventoryModule = InventoryModule;
exports.InventoryModule = InventoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            developers_module_1.DevelopersModule,
            developments_module_1.DevelopmentsModule,
            units_module_1.UnitsModule,
            sales_module_1.SalesModule,
            prices_module_1.PricesModule,
            cities_module_1.CitiesModule
        ],
    })
], InventoryModule);
//# sourceMappingURL=inventory.module.js.map