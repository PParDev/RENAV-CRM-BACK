
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreatePriceHistoryDto } from './dto/create-price-history.dto';

@Injectable()
export class PricesService {
    constructor(private readonly prisma: PrismaService) { }

    // Añade un nuevo precio al historial de una unidad y actualiza su precio actual general
    async addPriceToUnit(idUnidad: number, dto: CreatePriceHistoryDto) {
        const unidad = await this.prisma.invUnidad.findUnique({
            where: { id_unidad: idUnidad },
        });

        if (!unidad) {
            throw new NotFoundException(`Unit with ID ${idUnidad} not found`);
        }

        // Optional: Terminar el precio histórico anterior (ponerle vigente_hasta)
        // Buscamos el último precio activo para esta unidad
        const lastPrice = await this.prisma.invPrecioHistorico.findFirst({
            where: { id_unidad: idUnidad, vigente_hasta: null },
            orderBy: { vigente_desde: 'desc' },
        });

        return this.prisma.$transaction(async (tx) => {
            // 1. Si había un precio activo, lo "cerramos" con la fecha de inicio del nuevo
            if (lastPrice) {
                await tx.invPrecioHistorico.update({
                    where: { id_precio_historico: lastPrice.id_precio_historico },
                    data: { vigente_hasta: new Date(dto.vigente_desde) },
                });
            }

            // 2. Creamos el nuevo registro histórico
            const originDate = new Date(dto.vigente_desde);
            // Valid date check
            const validDate = isNaN(originDate.getTime()) ? new Date() : originDate;

            const newPriceHistory = await tx.invPrecioHistorico.create({
                data: {
                    id_unidad: idUnidad,
                    precio: dto.precio,
                    vigente_desde: validDate,
                    vigente_hasta: dto.vigente_hasta ? new Date(dto.vigente_hasta) : null,
                },
            });

            // 3. Opcional (pero muy deseable): Actualizamos el `precios_lista` actual de la unidad
            // para que las consultas rápidas sigan funcionando.
            await tx.invUnidad.update({
                where: { id_unidad: idUnidad },
                data: { precios_lista: dto.precio },
            });

            return newPriceHistory;
        });
    }

    // Obtiene todo el recuento histórico de cambios de precio de una unidad
    async getPriceHistory(idUnidad: number) {
        return this.prisma.invPrecioHistorico.findMany({
            where: { id_unidad: idUnidad },
            orderBy: { vigente_desde: 'desc' },
        });
    }
}
