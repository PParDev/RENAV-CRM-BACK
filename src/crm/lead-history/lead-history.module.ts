import { Module } from '@nestjs/common';
import { LeadHistoryController } from './lead-history.controller';
import { LeadHistoryService } from './lead-history.service';

@Module({
  controllers: [LeadHistoryController],
  providers: [LeadHistoryService]
})
export class LeadHistoryModule {}
