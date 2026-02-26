import { Module } from '@nestjs/common';
import { ApartadosService } from './apartados.service';
import { ApartadosController } from './apartados.controller';
import { DatabaseModule } from '../../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [ApartadosController],
    providers: [ApartadosService],
    exports: [ApartadosService]
})
export class ApartadosModule { }
