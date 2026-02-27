import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { TypologiesService } from './typologies.service';
import { CreateTypologyDto } from './dto/create-typology.dto';
import { UpdateTypologyDto } from './dto/update-typology.dto';

@Controller('inventory/typologies')
export class TypologiesController {
    constructor(private readonly typologiesService: TypologiesService) { }

    @Post()
    create(@Body() createTypologyDto: CreateTypologyDto) {
        return this.typologiesService.create(createTypologyDto);
    }

    @Get()
    findAll(
        @Query('skip') skip?: string,
        @Query('take') take?: string,
        @Query('id_desarrollo') id_desarrollo?: string,
        @Query('search') search?: string,
    ) {
        return this.typologiesService.findAll(
            skip ? +skip : undefined,
            take ? +take : undefined,
            id_desarrollo ? +id_desarrollo : undefined,
            search
        );
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.typologiesService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateTypologyDto: UpdateTypologyDto) {
        return this.typologiesService.update(id, updateTypologyDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.typologiesService.remove(id);
    }
}
