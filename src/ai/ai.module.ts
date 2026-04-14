import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { DatabaseModule } from '../database/database.module';
import { WhatsappSenderModule } from '../whatsapp/whatsapp-sender.module';
import { EventsModule } from '../events/events.module';

@Module({
    imports: [DatabaseModule, WhatsappSenderModule, EventsModule],
    controllers: [AiController],
    providers: [AiService],
    exports: [AiService],
})
export class AiModule {}
