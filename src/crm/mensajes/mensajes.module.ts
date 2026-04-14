import { Module } from '@nestjs/common';
import { MensajesService } from './mensajes.service';
import { MensajesController } from './mensajes.controller';
import { DatabaseModule } from '../../database/database.module';
import { WhatsappSenderModule } from '../../whatsapp/whatsapp-sender.module';

@Module({
    imports: [DatabaseModule, WhatsappSenderModule],
    controllers: [MensajesController],
    providers: [MensajesService],
    exports: [MensajesService],
})
export class MensajesModule { }
