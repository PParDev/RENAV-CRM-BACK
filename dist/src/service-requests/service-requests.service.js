"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRequestsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let ServiceRequestsService = class ServiceRequestsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createRequestDto) {
        const { id_lead, id_servicio, presupuesto_min, presupuesto_max, id_metodo_pago, ciudad, zona, ubicacion_texto, ...details } = createRequestDto;
        return this.prisma.$transaction(async (prisma) => {
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
            if (details.arquitectura) {
                await prisma.crmSolicitudArquitectura.create({
                    data: {
                        id_solicitud: baseRequest.id_solicitud,
                        ...details.arquitectura,
                    },
                });
            }
            else if (details.construccion) {
                await prisma.crmSolicitudConstruccion.create({
                    data: {
                        id_solicitud: baseRequest.id_solicitud,
                        ...details.construccion,
                    },
                });
            }
            else if (details.avaluo) {
                await prisma.crmSolicitudAvaluo.create({
                    data: {
                        id_solicitud: baseRequest.id_solicitud,
                        ...details.avaluo,
                    },
                });
            }
            else if (details.bienes_raices) {
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
    async findAllByLead(leadId) {
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
};
exports.ServiceRequestsService = ServiceRequestsService;
exports.ServiceRequestsService = ServiceRequestsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ServiceRequestsService);
//# sourceMappingURL=service-requests.service.js.map