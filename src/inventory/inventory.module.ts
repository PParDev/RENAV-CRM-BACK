import { Module } from '@nestjs/common';
import { DevelopersModule } from './developers/developers.module';
import { DevelopmentsModule } from './developments/developments.module';
import { UnitsModule } from './units/units.module';
import { SalesModule } from './sales/sales.module';
import { PricesModule } from './prices/prices.module';
import { CitiesModule } from './cities/cities.module';
import { TypologiesModule } from './typologies/typologies.module';
import { ApartadosModule } from './apartados/apartados.module';
import { RecycleBinService } from './recycle-bin.service';

@Module({
    imports: [
        DevelopersModule,
        DevelopmentsModule,
        UnitsModule,
        SalesModule,
        PricesModule,
        CitiesModule,
        TypologiesModule,
        ApartadosModule
    ],
    providers: [
        RecycleBinService
    ],
})
export class InventoryModule { }
