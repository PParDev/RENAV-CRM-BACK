
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

    @Get('trash')
    findDeleted() {
        return this.developersService.findDeleted();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        if (id === 'trash') return this.developersService.findDeleted();
        const numId = parseInt(id, 10);
        if (isNaN(numId)) throw new Error(`Invalid id: ${id}`);
        return this.developersService.findOne(numId);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateDeveloperDto: UpdateDeveloperDto) {
        return this.developersService.update(id, updateDeveloperDto);
    }

    @Patch(':id/restore')
    restore(@Param('id', ParseIntPipe) id: number) {
        return this.developersService.restore(id);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.developersService.remove(id);
    }
}
