
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { DevelopmentsService } from './developments.service';
import { CreateDevelopmentDto } from './dto/create-development.dto';
import { UpdateDevelopmentDto } from './dto/update-development.dto';
import { CreateTypologyDto } from './dto/create-typology.dto';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('inventory-developments')
@Controller('inventory/developments')
export class DevelopmentsController {
    constructor(private readonly developmentsService: DevelopmentsService) { }

    @Post()
    create(@Body() createDevelopmentDto: CreateDevelopmentDto) {
        return this.developmentsService.create(createDevelopmentDto);
    }

    @Post(':id/typologies')
    addTypology(@Param('id', ParseIntPipe) id: number, @Body() createTypologyDto: CreateTypologyDto) {
        return this.developmentsService.addTypology(id, createTypologyDto);
    }

    @Get()
    @ApiQuery({ name: 'skip', required: false, type: Number })
    @ApiQuery({ name: 'take', required: false, type: Number })
    @ApiQuery({ name: 'ciudad', required: false, type: Number })
    @ApiQuery({ name: 'desarrollador', required: false, type: Number })
    @ApiQuery({ name: 'search', required: false, type: String })
    findAll(
        @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
        @Query('take', new DefaultValuePipe(10), ParseIntPipe) take?: number,
        @Query('ciudad') ciudad?: number,
        @Query('desarrollador') desarrollador?: number,
        @Query('search') search?: string,
    ) {
        return this.developmentsService.findAll(skip, take, ciudad ? +ciudad : undefined, desarrollador ? +desarrollador : undefined, search);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.developmentsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateDevelopmentDto: UpdateDevelopmentDto) {
        return this.developmentsService.update(id, updateDevelopmentDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.developmentsService.remove(id);
    }
}
