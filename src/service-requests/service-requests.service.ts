
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';
import { CrmSolicitudServicio } from '@prisma/client';

@Injectable()
export class ServiceRequestsService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createRequestDto: CreateServiceRequestDto) {
        const { id_lead, id_servicio, presupuesto_min, presupuesto_max, id_metodo_pago, ciudad, zona, ubicacion_texto, ...details } = createRequestDto;

        return this.prisma.$transaction(async (prisma) => {
            // 1. Create base request
            const baseRequest = await prisma.crmSolicitudServicio.create({
                data: {
                    id_lead,
                    id_servicio,
                    presupuesto_min,
                    presupuesto_max,
                    id_metodo_pago,
                    ciudad,
                    zona,
                    ubicacion_texto,
                },
            });

            // 2. Create specific details based on service ID or type
            // Assuming details object contains specific fields matching the subtype DTOs
            if (details.arquitectura) {
                await prisma.crmSolicitudArquitectura.create({
                    data: {
                        id_solicitud: baseRequest.id_solicitud,
                        ...details.arquitectura,
                    },
                });
            } else if (details.construccion) {
                await prisma.crmSolicitudConstruccion.create({
                    data: {
                        id_solicitud: baseRequest.id_solicitud,
                        ...details.construccion,
                    },
                });
            } else if (details.avaluo) {
                await prisma.crmSolicitudAvaluo.create({
                    data: {
                        id_solicitud: baseRequest.id_solicitud,
                        ...details.avaluo,
                    },
                });
            } else if (details.bienes_raices) {
                await prisma.crmSolicitudBienesRaices.create({
                    data: {
                        id_solicitud: baseRequest.id_solicitud,
                        ...details.bienes_raices,
                    },
                });
            }

            return baseRequest;
        });
    }

    async findAllByLead(leadId: number) {
        return this.prisma.crmSolicitudServicio.findMany({
            where: { id_lead: leadId },
            include: {
                servicio: true,
                arquitectura: { include: { subtipo_habitacional: true, tipo_proyecto: true } },
                construccion: { include: { subtipo_habitacional: true, tipo_proyecto: true } },
                avaluo: true,
                bienes_raices: { include: { tipo_inmueble: true } },
            },
            orderBy: { creado_en: 'desc' },
        });
    }
}
