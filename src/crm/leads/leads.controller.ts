
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('leads')
@Controller('leads')
export class LeadsController {
    constructor(private readonly leadsService: LeadsService) { }

    @Post()
    create(@Body() createLeadDto: CreateLeadDto) {
        return this.leadsService.create(createLeadDto);
    }

    @Get()
    @ApiQuery({ name: 'skip', required: false, type: Number })
    @ApiQuery({ name: 'take', required: false, type: Number })
    @ApiQuery({ name: 'estado', required: false, type: String })
    @ApiQuery({ name: 'usuario', required: false, type: Number })
    @ApiQuery({ name: 'search', required: false, type: String })
    findAll(
        @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
        @Query('take', new DefaultValuePipe(10), ParseIntPipe) take?: number,
        @Query('estado') estado?: string,
        @Query('usuario', new DefaultValuePipe(0), ParseIntPipe) usuario?: number,
        @Query('search') search?: string,
    ) {
        return this.leadsService.findAll(skip, take, estado, usuario || undefined, search);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.leadsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateLeadDto: UpdateLeadDto) {
        return this.leadsService.update(id, updateLeadDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.leadsService.remove(id);
    }
}
