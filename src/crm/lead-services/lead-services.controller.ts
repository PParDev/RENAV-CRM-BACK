import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { LeadServicesService } from './lead-services.service';
import { CreateLeadServiceDto, UpdateLeadServiceDto } from './dto/create-lead-service.dto';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('lead-services')
@Controller('lead-services')
export class LeadServicesController {
    constructor(private readonly leadServicesService: LeadServicesService) {}

    @Post()
    create(@Body() dto: CreateLeadServiceDto) {
        return this.leadServicesService.create(dto);
    }

    @Get()
    @ApiQuery({ name: 'leadId', required: false, type: Number })
    findAll(@Query('leadId') leadId?: number) {
        return this.leadServicesService.findAll(leadId ? Number(leadId) : undefined);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.leadServicesService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateLeadServiceDto) {
        return this.leadServicesService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.leadServicesService.remove(id);
    }
}
