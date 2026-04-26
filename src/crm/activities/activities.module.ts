
import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { WhatsappSenderModule } from '../../whatsapp/whatsapp-sender.module';

@Module({
    imports: [WhatsappSenderModule],
    controllers: [ActivitiesController],
    providers: [ActivitiesService],
    exports: [ActivitiesService],
})
export class ActivitiesModule { }
