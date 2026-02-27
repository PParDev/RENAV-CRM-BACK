import { PrismaService } from '../../database/prisma.service';
import { CreatePriceHistoryDto } from './dto/create-price-history.dto';
export declare class PricesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    addPriceToUnit(idUnidad: number, dto: CreatePriceHistoryDto): Promise<{
        id_unidad: number;
        vigente_desde: Date;
        id_precio_historico: number;
        precio: import("@prisma/client-runtime-utils").Decimal;
        vigente_hasta: Date | null;
    }>;
    getPriceHistory(idUnidad: number): Promise<{
        id_unidad: number;
        vigente_desde: Date;
        id_precio_historico: number;
        precio: import("@prisma/client-runtime-utils").Decimal;
        vigente_hasta: Date | null;
    }[]>;
}
