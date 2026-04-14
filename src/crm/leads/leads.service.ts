
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
        // Auto-asignar al agente con menos leads activos si no se especificó uno
        const id_usuario_asignado =
            createLeadDto.id_usuario_asignado ?? (await this.getNextAgent());

        const lead = await this.prisma.crmLead.create({
            data: {
                id_contacto: createLeadDto.id_contacto,
                id_servicio_principal: createLeadDto.id_servicio_principal,
                estado: createLeadDto.estado,
                prioridad: createLeadDto.prioridad || 'MEDIA',
                id_usuario_asignado,
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

    // Devuelve el id del agente activo con menos leads abiertos (least-loaded)
    private async getNextAgent(): Promise<number | null> {
        const agents = await this.prisma.crmUsuario.findMany({
            where: { activo: true },
            select: { id_usuario: true },
        });
        if (!agents.length) return null;

        const ids = agents.map((a) => a.id_usuario);

        // Contar leads activos (no cerrados/descartados/perdidos) por agente
        const counts = await this.prisma.crmLead.groupBy({
            by: ['id_usuario_asignado'],
            where: {
                id_usuario_asignado: { in: ids },
                estado: { notIn: ['CERRADO', 'DESCARTADO', 'PERDIDO'] },
            },
            _count: { id_lead: true },
        });

        // Mapa agente → cantidad de leads activos (0 si no tiene ninguno)
        const countMap = new Map<number, number>(ids.map((id) => [id, 0]));
        for (const row of counts) {
            if (row.id_usuario_asignado !== null) {
                countMap.set(row.id_usuario_asignado, row._count.id_lead);
            }
        }

        // El agente con menos leads activos
        let minCount = Infinity;
        let selected: number | null = null;
        for (const [agentId, count] of countMap) {
            if (count < minCount) {
                minCount = count;
                selected = agentId;
            }
        }
        return selected;
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
        where.activo = true;

        const leads = await this.prisma.crmLead.findMany({
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
                },
                mensajes: {
                    orderBy: { creado_en: 'desc' },
                    take: 1,
                    select: { creado_en: true, es_entrante: true, texto: true, canal: true },
                },
            },
            orderBy: { creado_en: 'desc' },
        });

        // Augment with derived fields for the frontend
        return leads.map(lead => {
            const lastMsg = (lead as any).mensajes?.[0] ?? null;
            return {
                ...lead,
                mensajes: undefined, // don't send full messages list
                ultimo_mensaje: lastMsg?.creado_en ?? null,
                ultimo_canal: lastMsg?.canal ?? null,
                ultimo_texto: lastMsg ? lastMsg.texto?.slice(0, 60) : null,
                tiene_sin_leer: lastMsg?.es_entrante === true ? 1 : 0,
            };
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
            this.prisma.crmMensaje.count({ where: { id_lead: id, activo: true } }),
        ]);

        if (!lead || !lead.activo) throw new NotFoundException(`Lead with ID ${id} not found`);

        // Recalculate score from already-fetched data and persist if changed
        const newScore = this.computeScore(lead, totalMensajes);
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
        const where: any = { id_lead: id, activo: true };
        if (before) where.id_mensaje = { lt: before };

        const mensajes = await this.prisma.crmMensaje.findMany({
            where,
            orderBy: { creado_en: 'desc' },
            take: 20,
        });

        const total = await this.prisma.crmMensaje.count({ where: { id_lead: id, activo: true } });
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
            // Score sincronizado: calculamos y persistimos antes de devolver el lead
            const newScore = await this.calcularScore(id);
            lead.score = newScore;
            return lead;
        } catch (error) {
            if ((error as any).code === 'P2025') {
                throw new NotFoundException(`Lead with ID ${id} not found`);
            }
            throw error;
        }
    }

    // Calcula el score a partir de un objeto lead ya cargado (sin query adicional)
    // totalMensajes: número total de mensajes del lead (para señal de engagement)
    private computeScore(lead: any, totalMensajes = 0): number {
        let score = 0;

        // ── Prioridad base (máx 50) ────────────────────────────────────────────
        const prioMap: Record<string, number> = { BAJA: 5, MEDIA: 15, ALTA: 30, URGENTE: 50 };
        score += prioMap[lead.prioridad] ?? 15;

        // ── Completitud de datos de contacto (máx 10) ─────────────────────────
        if (lead.contacto?.telefono) score += 5;
        if (lead.contacto?.correo) score += 5;

        // ── Completitud del perfil inmobiliario (máx 20) ──────────────────────
        const sol = lead.solicitudes?.[0];
        const br = sol?.bienes_raices;
        if (sol?.presupuesto_max || sol?.presupuesto_min) score += 5;
        if (br?.id_tipo_inmueble) score += 5;
        if (sol?.zona || sol?.ciudad || br?.zona || br?.ciudad) score += 5;
        if (br?.recamaras || br?.m2_construidos_requeridos) score += 5;

        // ── Engagement (máx 15) ───────────────────────────────────────────────
        if (totalMensajes >= 3) score += 5;
        const actividades = lead.actividades ?? [];
        const tieneNotas = actividades.some((a: any) => a.tipo !== 'CITA');
        const tieneCita = actividades.some((a: any) => a.tipo === 'CITA');
        if (tieneNotas) score += 5;
        if (tieneCita) score += 5;

        // ── Señal de intención (máx 5) ────────────────────────────────────────
        if (lead.estado === 'CALIFICADO') score += 5;

        return Math.min(100, Math.max(0, score));
    }

    // Calcula y persiste el score de un lead basado en sus datos reales
    async calcularScore(leadId: number): Promise<number> {
        const [lead, totalMensajes] = await Promise.all([
            this.prisma.crmLead.findUnique({
                where: { id_lead: leadId },
                include: {
                    contacto: true,
                    solicitudes: { include: { bienes_raices: true } },
                    actividades: { select: { tipo: true } },
                },
            }),
            this.prisma.crmMensaje.count({ where: { id_lead: leadId } }),
        ]);
        if (!lead) return 0;

        const final = this.computeScore(lead, totalMensajes);
        await this.prisma.crmLead.update({ where: { id_lead: leadId }, data: { score: final } });
        return final;
    }

    // Propiedades del inventario que hacen match con el perfil del lead
    async findMatchingProperties(id: number): Promise<any> {
        const lead = await this.prisma.crmLead.findUnique({
            where: { id_lead: id },
            include: {
                solicitudes: {
                    include: { bienes_raices: { include: { tipo_inmueble: true } } },
                },
            },
        });
        if (!lead) throw new NotFoundException(`Lead with ID ${id} not found`);

        const sol = lead.solicitudes?.[0];
        const br = sol?.bienes_raices;

        const tienePerfil = !!(sol || br);
        const criterios: Record<string, any> = {};

        const where: any = {
            estado_unidad: { nombre: { contains: 'disponible', mode: 'insensitive' } },
        };

        if (br?.id_tipo_inmueble) {
            where.id_tipo_inmueble = br.id_tipo_inmueble;
            criterios.tipo = br.tipo_inmueble?.nombre;
        }

        if (sol?.presupuesto_max || sol?.presupuesto_min) {
            where.precios_lista = {};
            if (sol.presupuesto_min) { where.precios_lista.gte = sol.presupuesto_min; criterios.precio_min = sol.presupuesto_min; }
            if (sol.presupuesto_max) { where.precios_lista.lte = sol.presupuesto_max; criterios.precio_max = sol.presupuesto_max; }
        }

        const zona = br?.zona || sol?.zona;
        if (zona) {
            where.desarrollo = { zona: { nombre: { contains: zona, mode: 'insensitive' } } };
            criterios.zona = zona;
        }

        const propiedades = await this.prisma.invUnidad.findMany({
            where,
            take: 6,
            include: {
                desarrollo: { include: { zona: true } },
                tipo_inmueble: true,
                estado_unidad: true,
                tipologia: true,
            },
            orderBy: { precios_lista: 'asc' },
        });

        // Fallback: si no hay resultados con filtros, devolver las 6 más baratas disponibles
        const resultado = propiedades.length > 0 ? propiedades : await this.prisma.invUnidad.findMany({
            where: { estado_unidad: { nombre: { contains: 'disponible', mode: 'insensitive' } } },
            take: 6,
            include: {
                desarrollo: { include: { zona: true } },
                tipo_inmueble: true,
                estado_unidad: true,
                tipologia: true,
            },
            orderBy: { precios_lista: 'asc' },
        });

        return {
            tienePerfil,
            criterios,
            exactas: propiedades.length,
            propiedades: resultado.map(u => ({
                codigo: u.codigo_unidad,
                desarrollo: (u as any).desarrollo?.nombre,
                zona: (u as any).desarrollo?.zona?.nombre,
                tipo: (u as any).tipo_inmueble?.nombre,
                tipologia: (u as any).tipologia?.nombre,
                m2_construccion: u.m2_construccion ? Number(u.m2_construccion) : null,
                m2_terreno: u.m2_terreno ? Number(u.m2_terreno) : null,
                precio: u.precios_lista ? Number(u.precios_lista) : null,
                moneda: u.moneda,
                piso: u.nivel_piso,
                estado: (u as any).estado_unidad?.nombre,
            })),
        };
    }

    // Elimina múltiples leads en una sola operación
    async bulkDelete(ids: number[]): Promise<{ count: number }> {
        const result = await this.prisma.crmLead.updateMany({
            where: { id_lead: { in: ids } },
            data: { activo: false },
        });
        return { count: result.count };
    }

    // Cambia el estado de múltiples leads en una sola operación
    async bulkChangeStatus(ids: number[], estado: string): Promise<{ count: number }> {
        const result = await this.prisma.crmLead.updateMany({
            where: { id_lead: { in: ids } },
            data: { estado },
        });
        return { count: result.count };
    }

    // Asigna masivamente un usuario a múltiples leads
    async bulkAssign(ids: number[], id_usuario: number): Promise<{ count: number }> {
        const result = await this.prisma.crmLead.updateMany({
            where: { id_lead: { in: ids } },
            data: { id_usuario_asignado: id_usuario },
        });
        return { count: result.count };
    }

    // Elimina un lead de la base de datos
    async remove(id: number): Promise<CrmLead> {
        try {
            return await this.prisma.crmLead.update({
                where: { id_lead: id },
                data: { activo: false },
            });
        } catch (error) {
            if ((error as any).code === 'P2025') {
                throw new NotFoundException(`Lead with ID ${id} not found`);
            }
            throw error;
        }
    }
}
