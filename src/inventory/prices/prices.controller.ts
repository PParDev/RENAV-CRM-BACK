
import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { PricesService } from './prices.service';
import { CreatePriceHistoryDto } from './dto/create-price-history.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('inventory-prices')
@Controller('inventory/units/:id/prices')
export class PricesController {
    constructor(private readonly pricesService: PricesService) { }

    @Post()
    addPriceToUnit(@Param('id', ParseIntPipe) id: number, @Body() dto: CreatePriceHistoryDto) {
        return this.pricesService.addPriceToUnit(id, dto);
    }

    @Get()
    getPriceHistory(@Param('id', ParseIntPipe) id: number) {
        return this.pricesService.getPriceHistory(id);
    }
}
