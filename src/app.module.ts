import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CatalogsModule } from './catalogs/catalogs.module';
import { InventoryModule } from './inventory/inventory.module';
import { DatabaseModule } from './database/database.module';
import { CrmModule } from './crm/crm.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    CatalogsModule,
    InventoryModule,
    CrmModule,
  ],
})
export class AppModule { }
