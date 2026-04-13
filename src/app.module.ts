import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CatalogsModule } from './catalogs/catalogs.module';
import { InventoryModule } from './inventory/inventory.module';
import { DatabaseModule } from './database/database.module';
import { CrmModule } from './crm/crm.module';
import { UploadModule } from './upload/upload.module';
import { AiModule } from './ai/ai.module';

import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    AuthModule,
    CatalogsModule,
    InventoryModule,
    CrmModule,
    UploadModule,
    AiModule,
  ],
})
export class AppModule { }
