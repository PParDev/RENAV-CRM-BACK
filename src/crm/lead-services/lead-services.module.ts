import { Module } from '@nestjs/common';
import { LeadServicesController } from './lead-services.controller';
import { LeadServicesService } from './lead-services.service';

@Module({
  controllers: [LeadServicesController],
  providers: [LeadServicesService]
})
export class LeadServicesModule {}
