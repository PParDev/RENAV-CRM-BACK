"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const leads_module_1 = require("./leads/leads.module");
const contacts_module_1 = require("./contacts/contacts.module");
const catalogs_module_1 = require("./catalogs/catalogs.module");
const activities_module_1 = require("./activities/activities.module");
const service_requests_module_1 = require("./service-requests/service-requests.module");
const inventory_module_1 = require("./inventory/inventory.module");
const database_module_1 = require("./database/database.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            leads_module_1.LeadsModule,
            contacts_module_1.ContactsModule,
            catalogs_module_1.CatalogsModule,
            activities_module_1.ActivitiesModule,
            service_requests_module_1.ServiceRequestsModule,
            inventory_module_1.InventoryModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map