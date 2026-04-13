
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, DefaultValuePipe, HttpCode, HttpStatus } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

class BulkDeleteDto {
    @IsArray()
    @IsNumber({}, { each: true })
    ids: number[];
}

class BulkStatusDto {
    @IsArray()
    @IsNumber({}, { each: true })
    ids: number[];

    @IsString()
    estado: string;
}

class BulkAssignDto {
    @IsArray()
    @IsNumber({}, { each: true })
    ids: number[];

    @IsNumber()
    id_usuario: number;
}

@ApiTags('leads')
@Controller('leads')
export class LeadsController {
    constructor(private readonly leadsService: LeadsService) { }

    @Post()
    create(@Body() createLeadDto: CreateLeadDto) {
        return this.leadsService.create(createLeadDto);
    }

    // Bulk: eliminar varios leads de una vez
    @Post('bulk-delete')
    @HttpCode(HttpStatus.OK)
    bulkDelete(@Body() body: BulkDeleteDto) {
        return this.leadsService.bulkDelete(body.ids);
    }

    // Bulk: cambiar estado de varios leads de una vez
    @Patch('bulk-status')
    bulkChangeStatus(@Body() body: BulkStatusDto) {
        return this.leadsService.bulkChangeStatus(body.ids, body.estado);
    }

    // Bulk: asignar usuario masivamente
    @Patch('bulk-assign')
    bulkAssign(@Body() body: BulkAssignDto) {
        return this.leadsService.bulkAssign(body.ids, body.id_usuario);
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

    @Get(':id/messages')
    findMessages(
        @Param('id', ParseIntPipe) id: number,
        @Query('before', new DefaultValuePipe(0), ParseIntPipe) before: number,
    ) {
        return this.leadsService.findMessages(id, before || undefined);
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
