
import { Controller, Get, Post, Body, Query, ParseIntPipe } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateApartadoDto } from './dto/create-apartado.dto';
import { CreateVentaDto } from './dto/create-venta.dto';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('inventory-sales')
@Controller('inventory/sales')
export class SalesController {
    constructor(private readonly salesService: SalesService) { }

    @Post('apartados')
    createApartado(@Body() createApartadoDto: CreateApartadoDto) {
        return this.salesService.createApartado(createApartadoDto);
    }

    @Post('ventas')
    createVenta(@Body() createVentaDto: CreateVentaDto) {
        return this.salesService.createVenta(createVentaDto);
    }

    @Get('apartados')
    @ApiQuery({ name: 'leadId', required: false, type: Number })
    findAllApartados(@Query('leadId', ParseIntPipe) leadId?: number) {
        return this.salesService.findAllApartados(leadId);
    }

    @Get('ventas')
    @ApiQuery({ name: 'leadId', required: false, type: Number })
    findAllVentas(@Query('leadId', ParseIntPipe) leadId?: number) {
        return this.salesService.findAllVentas(leadId);
    }
}
