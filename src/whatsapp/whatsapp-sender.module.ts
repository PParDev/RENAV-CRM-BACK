import { Module } from '@nestjs/common';
import { WhatsappSenderService } from './whatsapp-sender.service';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    providers: [WhatsappSenderService],
    exports: [WhatsappSenderService],
})
export class WhatsappSenderModule {}
