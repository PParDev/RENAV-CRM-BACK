import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { LeadsModule } from './leads/leads.module';
import { ContactsModule } from './contacts/contacts.module';
import { ActivitiesModule } from './activities/activities.module';
import { ServiceRequestsModule } from './service-requests/service-requests.module';
import { PipelinesModule } from './pipelines/pipelines.module';
import { LeadHistoryModule } from './lead-history/lead-history.module';
import { LeadServicesModule } from './lead-services/lead-services.module';
import { MensajesModule } from './mensajes/mensajes.module';

@Module({
    imports: [
        UsersModule,
        LeadsModule,
        ContactsModule,
        ActivitiesModule,
        ServiceRequestsModule,
        PipelinesModule,
        LeadHistoryModule,
        LeadServicesModule,
        MensajesModule,
    ],
})
export class CrmModule { }
