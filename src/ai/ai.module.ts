import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { AiConfigController } from './ai-config.controller';
import { AiConfigService } from './ai-config.service';
import { DatabaseModule } from '../database/database.module';
import { WhatsappSenderModule } from '../whatsapp/whatsapp-sender.module';
import { EventsModule } from '../events/events.module';

@Module({
    imports: [DatabaseModule, WhatsappSenderModule, EventsModule],
    controllers: [AiController, AiConfigController],
    providers: [AiService, AiConfigService],
    exports: [AiService, AiConfigService],
})
export class AiModule {}
