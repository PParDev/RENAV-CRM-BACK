
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { UnitsService } from './units.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('inventory-units')
@Controller('inventory/units')
export class UnitsController {
    constructor(private readonly unitsService: UnitsService) { }

    @Post()
    create(@Body() createUnitDto: CreateUnitDto) {
        return this.unitsService.create(createUnitDto);
    }

    @Get()
    @ApiQuery({ name: 'skip', required: false, type: Number })
    @ApiQuery({ name: 'take', required: false, type: Number })
    @ApiQuery({ name: 'desarrolloId', required: false, type: Number })
    @ApiQuery({ name: 'codigo', required: false, type: String })
    findAll(
        @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
        @Query('take', new DefaultValuePipe(10), ParseIntPipe) take?: number,
        @Query('desarrolloId') desarrolloId?: number,
        @Query('codigo') codigo?: string,
    ) {
        return this.unitsService.findAll(skip, take, desarrolloId ? +desarrolloId : undefined, codigo);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.unitsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateUnitDto: UpdateUnitDto) {
        return this.unitsService.update(id, updateUnitDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.unitsService.remove(id);
    }
}
