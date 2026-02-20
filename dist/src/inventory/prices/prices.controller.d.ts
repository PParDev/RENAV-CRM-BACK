import { PricesService } from './prices.service';
import { CreatePriceHistoryDto } from './dto/create-price-history.dto';
export declare class PricesController {
    private readonly pricesService;
    constructor(pricesService: PricesService);
    addPriceToUnit(id: number, dto: CreatePriceHistoryDto): Promise<{
        id_unidad: number;
        vigente_desde: Date;
        precio: import("@prisma/client-runtime-utils").Decimal;
        vigente_hasta: Date | null;
        id_precio_historico: number;
    }>;
    getPriceHistory(id: number): Promise<{
        id_unidad: number;
        vigente_desde: Date;
        precio: import("@prisma/client-runtime-utils").Decimal;
        vigente_hasta: Date | null;
        id_precio_historico: number;
    }[]>;
}
