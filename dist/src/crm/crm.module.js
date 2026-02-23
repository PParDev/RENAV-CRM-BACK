"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrmModule = void 0;
const common_1 = require("@nestjs/common");
const users_module_1 = require("./users/users.module");
const leads_module_1 = require("./leads/leads.module");
const contacts_module_1 = require("./contacts/contacts.module");
const activities_module_1 = require("./activities/activities.module");
const service_requests_module_1 = require("./service-requests/service-requests.module");
const pipelines_module_1 = require("./pipelines/pipelines.module");
const lead_history_module_1 = require("./lead-history/lead-history.module");
const lead_services_module_1 = require("./lead-services/lead-services.module");
let CrmModule = class CrmModule {
};
exports.CrmModule = CrmModule;
exports.CrmModule = CrmModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            leads_module_1.LeadsModule,
            contacts_module_1.ContactsModule,
            activities_module_1.ActivitiesModule,
            service_requests_module_1.ServiceRequestsModule,
            pipelines_module_1.PipelinesModule,
            lead_history_module_1.LeadHistoryModule,
            lead_services_module_1.LeadServicesModule,
        ],
    })
], CrmModule);
//# sourceMappingURL=crm.module.js.map