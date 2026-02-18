
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LeadsModule } from './leads/leads.module';
import { ContactsModule } from './contacts/contacts.module';
import { CatalogsModule } from './catalogs/catalogs.module';
import { ActivitiesModule } from './activities/activities.module';
import { ServiceRequestsModule } from './service-requests/service-requests.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    LeadsModule,
    ContactsModule,
    CatalogsModule,
    ActivitiesModule,
    ServiceRequestsModule,
  ],
})
export class AppModule { }
