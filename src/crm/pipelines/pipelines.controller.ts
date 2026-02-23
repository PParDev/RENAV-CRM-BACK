import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PipelinesService } from './pipelines.service';
import { CreatePipelineDto, UpdatePipelineDto } from './dto/create-pipeline.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('pipelines')
@Controller('pipelines')
export class PipelinesController {
    constructor(private readonly pipelinesService: PipelinesService) {}

    @Post()
    create(@Body() dto: CreatePipelineDto) {
        return this.pipelinesService.create(dto);
    }

    @Get()
    findAll() {
        return this.pipelinesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.pipelinesService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePipelineDto) {
        return this.pipelinesService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.pipelinesService.remove(id);
    }
}
