
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

    @Post('bulk')
    createBulk(@Body() body: any) {
        const units: CreateUnitDto[] = Array.isArray(body.units) ? body.units : [];
        if (units.length === 0) return { count: 0 };
        return this.unitsService.createBulk(units);
    }

    @Post('bulk-delete')
    bulkRemove(@Body('ids') ids: number[]) {
        if (!ids || !ids.length) return { count: 0 };
        return this.unitsService.bulkRemove(ids);
    }

    @Post('bulk-restore')
    bulkRestore(@Body('ids') ids: number[]) {
        if (!ids || !ids.length) return { count: 0 };
        return this.unitsService.bulkRestore(ids);
    }

    @Get()
    @ApiQuery({ name: 'skip', required: false, type: Number })
    @ApiQuery({ name: 'take', required: false, type: Number })
    @ApiQuery({ name: 'desarrolloId', required: false, type: Number })
    @ApiQuery({ name: 'codigo', required: false, type: String })
    @ApiQuery({ name: 'activo', required: false, type: String })
    findAll(
        @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
        @Query('take', new DefaultValuePipe(10), ParseIntPipe) take?: number,
        @Query('desarrolloId') desarrolloId?: number,
        @Query('codigo') codigo?: string,
        @Query('activo') activo?: string,
    ) {
        return this.unitsService.findAll(skip, take, desarrolloId ? +desarrolloId : undefined, codigo, activo);
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
