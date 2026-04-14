import { Module } from '@nestjs/common';
import { WhatsappController } from './whatsapp.controller';
import { WhatsappService } from './whatsapp.service';
import { LeadsModule } from '../crm/leads/leads.module';
import { ContactsModule } from '../crm/contacts/contacts.module';
import { DatabaseModule } from '../database/database.module';
import { AiModule } from '../ai/ai.module';
import { EventsModule } from '../events/events.module';
import { WhatsappSenderModule } from './whatsapp-sender.module';

@Module({
    imports: [DatabaseModule, LeadsModule, ContactsModule, AiModule, EventsModule, WhatsappSenderModule],
    controllers: [WhatsappController],
    providers: [WhatsappService],
    exports: [WhatsappService],
})
export class WhatsappModule { }
