
import { Controller, Get, Post, Body, Param, ParseIntPipe, Query, DefaultValuePipe } from '@nestjs/common';
import { ServiceRequestsService } from './service-requests.service';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('service-requests')
@Controller('service-requests')
export class ServiceRequestsController {
    constructor(private readonly serviceRequestsService: ServiceRequestsService) { }

    @Post()
    create(@Body() createRequestDto: CreateServiceRequestDto) {
        return this.serviceRequestsService.create(createRequestDto);
    }

    @Get()
    findAllByLead(
        @Query('leadId', ParseIntPipe) leadId: number,
    ) {
        return this.serviceRequestsService.findAllByLead(leadId);
    }
}
