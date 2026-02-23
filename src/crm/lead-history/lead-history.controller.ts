import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { LeadHistoryService } from './lead-history.service';
import { CreateLeadHistoryDto, UpdateLeadHistoryDto } from './dto/create-lead-history.dto';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('lead-history')
@Controller('lead-history')
export class LeadHistoryController {
    constructor(private readonly leadHistoryService: LeadHistoryService) {}

    @Post()
    create(@Body() dto: CreateLeadHistoryDto) {
        return this.leadHistoryService.create(dto);
    }

    @Get()
    @ApiQuery({ name: 'leadId', required: false, type: Number })
    findAll(@Query('leadId') leadId?: number) {
        return this.leadHistoryService.findAll(leadId ? Number(leadId) : undefined);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.leadHistoryService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateLeadHistoryDto) {
        return this.leadHistoryService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.leadHistoryService.remove(id);
    }
}
