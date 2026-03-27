
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { CrmLead } from '@prisma/client';

@Injectable()
export class LeadsService {
    constructor(private readonly prisma: PrismaService) { }

    // Crea un nuevo lead en la base de datos y asigna valores iniciales
    async create(createLeadDto: CreateLeadDto): Promise<CrmLead> {
        const lead = await this.prisma.crmLead.create({
            data: {
                id_contacto: createLeadDto.id_contacto,
                id_servicio_principal: createLeadDto.id_servicio_principal,
                estado: createLeadDto.estado,
                prioridad: createLeadDto.prioridad || 'MEDIA',
                id_usuario_asignado: createLeadDto.id_usuario_asignado,
                notas_iniciales: createLeadDto.notas_iniciales,
            },
            include: {
                contacto: true,
                usuario_asignado: true,
                servicio_principal: true,
            },
        });
        this.calcularScore(lead.id_lead).catch(() => {});
        return lead;
    }

    // Obtiene una lista paginada de leads, con opción de filtrar por estado, usuario asignado o búsqueda
    async findAll(
        skip?: number,
        take?: number,
        estado?: string,
        usuario?: number,
        search?: string
    ): Promise<CrmLead[]> {
        const where: any = {};
        if (estado) where.estado = estado;
        if (usuario) where.id_usuario_asignado = usuario;
        if (search) {
            where.contacto = {
                OR: [
                    { nombre: { contains: search, mode: 'insensitive' } },
                    { correo: { contains: search, mode: 'insensitive' } },
                    { telefono: { contains: search, mode: 'insensitive' } },
                ],
            };
        }

        return this.prisma.crmLead.findMany({
            skip,
            take,
            where,
            include: {
                contacto: true,
                usuario_asignado: true,
                servicio_principal: true,
                solicitudes: {
                    include: {
                        servicio: true,
                        bienes_raices: {
                            include: {
                                tipo_inmueble: true,
                            }
                        },
                        arquitectura: { include: { tipo_proyecto: true, subtipo_habitacional: true } },
                        construccion: { include: { tipo_proyecto: true, subtipo_habitacional: true } },
                        avaluo: true
                    }
                }
            },
            orderBy: { creado_en: 'desc' },
        });
    }

    // Busca un solo lead por su ID — mensajes limitados a los últimos 20
    async findOne(id: number): Promise<any> {
        const [lead, totalMensajes] = await Promise.all([
            this.prisma.crmLead.findUnique({
                where: { id_lead: id },
                include: {
                    contacto: true,
                    usuario_asignado: true,
                    servicio_principal: true,
                    actividades: { orderBy: { creada_en: 'desc' } },
                    mensajes: { orderBy: { creado_en: 'desc' }, take: 20 },
                    solicitudes: {
                        include: {
                            bienes_raices: { include: { tipo_inmueble: true } },
                        },
                    },
                    historial_etapas: { orderBy: { cambiado_en: 'desc' }, include: { etapa: true, usuario: true } },
                },
            }),
            this.prisma.crmMensaje.count({ where: { id_lead: id } }),
        ]);

        if (!lead) throw new NotFoundException(`Lead with ID ${id} not found`);

        // Recalculate score from already-fetched data and persist if changed
        const newScore = this.computeScore(lead);
        if (newScore !== lead.score) {
            this.prisma.crmLead.update({ where: { id_lead: id }, data: { score: newScore } }).catch(() => {});
            lead.score = newScore;
        }

        // Return in chronological order (oldest → newest)
        lead.mensajes = lead.mensajes.reverse();
        return { ...lead, totalMensajes };
    }

    // Mensajes paginados por cursor: devuelve 20 mensajes anteriores a `before`
    async findMessages(id: number, before?: number): Promise<any> {
        const where: any = { id_lead: id };
        if (before) where.id_mensaje = { lt: before };

        const mensajes = await this.prisma.crmMensaje.findMany({
            where,
            orderBy: { creado_en: 'desc' },
            take: 20,
        });

        const total = await this.prisma.crmMensaje.count({ where: { id_lead: id } });
        return { mensajes: mensajes.reverse(), total };
    }

    // Actualiza la información de un lead existente
    async update(id: number, updateLeadDto: UpdateLeadDto): Promise<CrmLead> {
        const { estado, ...rest } = updateLeadDto;

        try {
            // If status changes, update the lead and possibly add activity/history
            // For now, simpler update
            const data: any = { ...rest };
            if (estado) data.estado = estado;

            const lead = await this.prisma.crmLead.update({
                where: { id_lead: id },
                data,
                include: {
                    contacto: true,
                    usuario_asignado: true,
                    servicio_principal: true,
                },
            });
            this.calcularScore(id).catch(() => {});
            return lead;
        } catch (error) {
            if ((error as any).code === 'P2025') {
                throw new NotFoundException(`Lead with ID ${id} not found`);
            }
            throw error;
        }
    }

    // Calcula el score a partir de un objeto lead ya cargado (sin query adicional)
    private computeScore(lead: any): number {
        let score = 0;
        const prioMap: Record<string, number> = { BAJA: 10, MEDIA: 25, ALTA: 45, URGENTE: 65 };
        score += prioMap[lead.prioridad] ?? 25;
        if (lead.contacto?.correo) score += 5;
        if (lead.contacto?.telefono) score += 5;
        const sol = lead.solicitudes?.[0];
        if (sol?.presupuesto_max || sol?.presupuesto_min) score += 10;
        if (sol?.zona || sol?.ciudad) score += 5;
        if (sol?.bienes_raices?.id_tipo_inmueble) score += 5;
        if (lead.estado === 'CALIFICADO') score += 5;
        if ((lead.actividades?.length ?? 0) > 0) score += 5;
        return Math.min(100, Math.max(0, score));
    }

    // Calcula y persiste el score de un lead basado en sus datos reales
    async calcularScore(leadId: number): Promise<number> {
        const lead = await this.prisma.crmLead.findUnique({
            where: { id_lead: leadId },
            include: {
                contacto: true,
                solicitudes: { include: { bienes_raices: true } },
                actividades: { take: 1 },
            },
        });
        if (!lead) return 0;

        const final = this.computeScore(lead);
        await this.prisma.crmLead.update({ where: { id_lead: leadId }, data: { score: final } });
        return final;
    }

    // Elimina un lead de la base de datos
    async remove(id: number): Promise<CrmLead> {
        try {
            return await this.prisma.crmLead.delete({
                where: { id_lead: id },
            });
        } catch (error) {
            if ((error as any).code === 'P2025') {
                throw new NotFoundException(`Lead with ID ${id} not found`);
            }
            throw error;
        }
    }
}
