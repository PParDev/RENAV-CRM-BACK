import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, ParseBoolPipe } from '@nestjs/common';
import { ApartadosService } from './apartados.service';
import { CreateApartadoDto } from './dto/create-apartado.dto';
import { UpdateApartadoDto } from './dto/update-apartado.dto';

@Controller('inventory/apartados')
export class ApartadosController {
    constructor(private readonly apartadosService: ApartadosService) { }

    @Post()
    create(@Body() createApartadoDto: CreateApartadoDto) {
        return this.apartadosService.create(createApartadoDto);
    }

    @Get()
    findAll(
        @Query('skip') skip?: string,
        @Query('take') take?: string,
        @Query('id_unidad') id_unidad?: string,
        @Query('id_lead') id_lead?: string,
        @Query('status') status?: string,
    ) {
        let statusParsed: boolean | undefined = undefined;
        if (status !== undefined) {
            statusParsed = status === 'true';
        }

        return this.apartadosService.findAll(
            skip ? +skip : undefined,
            take ? +take : undefined,
            id_unidad ? +id_unidad : undefined,
            id_lead ? +id_lead : undefined,
            statusParsed
        );
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.apartadosService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateApartadoDto: UpdateApartadoDto) {
        return this.apartadosService.update(id, updateApartadoDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.apartadosService.remove(id);
    }
}
