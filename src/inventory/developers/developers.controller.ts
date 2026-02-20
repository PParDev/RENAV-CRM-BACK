
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { DevelopersService } from './developers.service';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('inventory-developers')
@Controller('inventory/developers')
export class DevelopersController {
    constructor(private readonly developersService: DevelopersService) { }

    @Post()
    create(@Body() createDeveloperDto: CreateDeveloperDto) {
        return this.developersService.create(createDeveloperDto);
    }

    @Get()
    @ApiQuery({ name: 'search', required: false, type: String })
    findAll(@Query('search') search?: string) {
        return this.developersService.findAll(search);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.developersService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateDeveloperDto: UpdateDeveloperDto) {
        return this.developersService.update(id, updateDeveloperDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.developersService.remove(id);
    }
}
