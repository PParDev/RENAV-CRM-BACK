
import { Module } from '@nestjs/common';
import { DevelopersModule } from './developers/developers.module';
import { DevelopmentsModule } from './developments/developments.module';
import { UnitsModule } from './units/units.module';
import { SalesModule } from './sales/sales.module';
import { PricesModule } from './prices/prices.module';
import { CitiesModule } from './cities/cities.module';

@Module({
    imports: [
        DevelopersModule,
        DevelopmentsModule,
        UnitsModule,
        SalesModule,
        PricesModule,
        CitiesModule
    ],
})
export class InventoryModule { }
