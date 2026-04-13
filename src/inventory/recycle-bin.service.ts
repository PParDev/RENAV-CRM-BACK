import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

/**
 * RecycleBinService
 *
 * Los registros eliminados se mantienen indefinidamente en la BD con activo=false.
 * No se eliminan de forma permanente. El módulo de limpieza automática está desactivado.
 */
@Injectable()
export class RecycleBinService {
    private readonly logger = new Logger(RecycleBinService.name);

    constructor(private readonly prisma: PrismaService) {}

    // Eliminación permanente desactivada intencionalmente.
    // Los registros con activo=false permanecen en la BD indefinidamente.
}
