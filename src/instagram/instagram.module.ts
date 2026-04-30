import { Module } from '@nestjs/common';
import { InstagramController } from './instagram.controller';
import { InstagramService } from './instagram.service';
import { InstagramSenderService } from './instagram-sender.service';
import { LeadsModule } from '../crm/leads/leads.module';
import { AiModule } from '../ai/ai.module';
import { EventsModule } from '../events/events.module';

@Module({
    imports: [LeadsModule, AiModule, EventsModule],
    controllers: [InstagramController],
    providers: [InstagramService, InstagramSenderService],
    exports: [InstagramService, InstagramSenderService],
})
export class InstagramModule { }
