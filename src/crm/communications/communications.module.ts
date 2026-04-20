import { Module } from '@nestjs/common';
import { EmailService } from './email/email.service';
import { EmailController } from './email/email.controller';
import { TemplatesService } from './templates/templates.service';
import { TemplatesController } from './templates/templates.controller';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [EmailController, TemplatesController],
  providers: [EmailService, TemplatesService],
  exports: [EmailService, TemplatesService],
})
export class CommunicationsModule {}
