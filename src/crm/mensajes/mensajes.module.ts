import { Module } from '@nestjs/common';
import { MensajesService } from './mensajes.service';
import { MensajesController } from './mensajes.controller';
import { DatabaseModule } from '../../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [MensajesController],
    providers: [MensajesService],
    exports: [MensajesService],
})
export class MensajesModule { }
