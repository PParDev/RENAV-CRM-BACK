import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../database/prisma.service';

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'openai/gpt-4o-mini';

// Catalog constants
const ID_SERVICIO_BIENES_RAICES = 9;
const TIPO_INMUEBLE_MAP: Record<string, number> = {
    casa: 5,
    departamento: 4,
    depto: 4,
    lote: 3,
    terreno: 3,
    bodega: 6,
};

// ─── Tool definitions ────────────────────────────────────────────────────────
const TOOLS = [
    {
        type: 'function',
        function: {
            name: 'buscar_propiedades',
            description:
                'Busca propiedades disponibles en el inventario de RENAV según los criterios del cliente. Úsala cuando el cliente pregunte por opciones, precios, zonas, tamaños o tipos de inmueble.',
            parameters: {
                type: 'object',
                properties: {
                    tipo_inmueble: { type: 'string', description: 'Tipo: casa, departamento, lote, bodega' },
                    precio_min: { type: 'number' },
                    precio_max: { type: 'number' },
                    m2_min: { type: 'number' },
                    m2_max: { type: 'number' },
                    zona: { type: 'string' },
                },
                required: [],
            },
        },
    },
    {
        type: 'function',
        function: {
            name: 'actualizar_lead',
            description:
                'Actualiza el estado y/o prioridad del lead según el nivel de interés y calificación detectado en la conversación. Úsala cuando detectes cambios en el nivel de interés o avance en el proceso de compra.',
            parameters: {
                type: 'object',
                properties: {
                    estado: {
                        type: 'string',
                        enum: ['NUEVO', 'EN PROCESO', 'CALIFICADO', 'CERRADO', 'DESCARTADO', 'PERDIDO'],
                        description: 'Nuevo estado del lead',
                    },
                    prioridad: {
                        type: 'string',
                        enum: ['BAJA', 'MEDIA', 'ALTA', 'URGENTE'],
                        description: 'BAJA=solo curiosidad, MEDIA=interés real sin urgencia, ALTA=intención clara con presupuesto, URGENTE=listo para comprar o visitar',
                    },
                },
                required: [],
            },
        },
    },
    {
        type: 'function',
        function: {
            name: 'actualizar_perfil_inmobiliario',
            description:
                'Guarda o actualiza las preferencias inmobiliarias del cliente (tipo de propiedad, zona, presupuesto, recámaras, m², etc.) a medida que el cliente las menciona.',
            parameters: {
                type: 'object',
                properties: {
                    tipo_inmueble: { type: 'string', description: 'casa, departamento, lote, bodega' },
                    ciudad: { type: 'string' },
                    zona: { type: 'string' },
                    presupuesto_min: { type: 'number' },
                    presupuesto_max: { type: 'number' },
                    recamaras: { type: 'number' },
                    banos: { type: 'number' },
                    m2_requeridos: { type: 'number' },
                },
                required: [],
            },
        },
    },
    {
        type: 'function',
        function: {
            name: 'crear_nota',
            description:
                'Crea una nota interna o registra una llamada/tarea en el historial del lead. Úsala para dejar evidencia de información clave que el agente humano debe saber.',
            parameters: {
                type: 'object',
                properties: {
                    descripcion: { type: 'string', description: 'Contenido de la nota' },
                    tipo: {
                        type: 'string',
                        enum: ['NOTE', 'CALL', 'TASK', 'WHATSAPP', 'EMAIL'],
                        description: 'Tipo de actividad (NOTE por defecto)',
                    },
                },
                required: ['descripcion'],
            },
        },
    },
    {
        type: 'function',
        function: {
            name: 'agendar_cita',
            description:
                'Registra una cita o visita cuando el cliente muestra intención de ver una propiedad o reunirse con un asesor.',
            parameters: {
                type: 'object',
                properties: {
                    descripcion: { type: 'string', description: 'Descripción de la cita o visita' },
                    fecha_iso: { type: 'string', description: 'Fecha y hora en formato ISO 8601. Omitir si no se especificó.' },
                },
                required: ['descripcion'],
            },
        },
    },
];

@Injectable()
export class AiService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly config: ConfigService,
    ) {}

    // ── Main entry point ─────────────────────────────────────────────────────
    async chat(leadId: number, userMessage: string, esEntrante: boolean): Promise<{ respuesta: string }> {
        const key = this.config.get<string>('OPENROUTER_KEY');

        // 1. Load lead context
        const lead = await this.prisma.crmLead.findUnique({
            where: { id_lead: leadId },
            include: {
                contacto: true,
                solicitudes: {
                    include: {
                        bienes_raices: { include: { tipo_inmueble: true } },
                    },
                },
            },
        });

        // 2. Load chat history
        const mensajes = await this.prisma.crmMensaje.findMany({
            where: { id_lead: leadId },
            orderBy: { creado_en: 'asc' },
        });

        // 3. Build context summary
        const br = lead?.solicitudes?.[0]?.bienes_raices;
        const sol = lead?.solicitudes?.[0];
        const perfil = [
            br?.tipo_inmueble?.nombre ? `Tipo buscado: ${br.tipo_inmueble.nombre}` : null,
            br?.zona ? `Zona: ${br.zona}` : null,
            br?.ciudad ?? sol?.ciudad ? `Ciudad: ${br?.ciudad ?? sol?.ciudad}` : null,
            sol?.presupuesto_max ? `Presupuesto máx: $${sol.presupuesto_max}` : null,
            sol?.presupuesto_min ? `Presupuesto mín: $${sol.presupuesto_min}` : null,
            br?.recamaras ? `Recámaras: ${br.recamaras}` : null,
            br?.m2_construidos_requeridos ? `M² requeridos: ${br.m2_construidos_requeridos}` : null,
        ].filter(Boolean).join(' | ') || 'Sin perfil registrado aún';

        const systemPrompt = `Eres Maya, asesora virtual inteligente de RENAV Real Estate Group. Tu objetivo principal es CALIFICAR al lead, construir su perfil inmobiliario y facilitar el trabajo del agente humano.

*DATOS DEL LEAD:*
- Nombre: ${lead?.contacto?.nombre || 'cliente'}
- Estado CRM: ${lead?.estado || 'NUEVO'} | Prioridad: ${lead?.prioridad || 'MEDIA'}
- Perfil registrado: ${perfil}

*REGLAS DE HERRAMIENTAS (OBLIGATORIAS):*
- Si el cliente menciona tipo de inmueble, zona, presupuesto, recámaras o m²: llama INMEDIATAMENTE *actualizar_perfil_inmobiliario* con todos los datos mencionados ANTES de responder. Convierte expresiones como "4 millones" → 4000000, "500 mil" → 500000.
- Si detectas cambio en nivel de interés o intención de compra: llama *actualizar_lead* con el estado/prioridad correspondiente.
  - BAJA: solo curiosidad | MEDIA: interés sin urgencia | ALTA: presupuesto + plazo claros | URGENTE: quiere visitar o comprar ya
- Si el perfil tiene tipo + zona o presupuesto: llama *buscar_propiedades* para mostrar opciones reales.
- Si el cliente menciona querer visitar o agendar reunión: llama *agendar_cita* INMEDIATAMENTE.
- Después de cada conversación relevante: llama *crear_nota* con el resumen de datos clave para el agente humano.
- Cuando tengas tipo + zona + presupuesto + al menos una señal de intención: llama *actualizar_lead* con estado=CALIFICADO.
- NUNCA digas "voy a registrar" o "voy a guardar" — simplemente llama la herramienta y confirma al cliente.

*REGLAS DE FORMATO:*
- Usa formato WhatsApp: *texto* para negritas (un solo asterisco), _texto_ para cursiva.
- Respuestas concisas (máximo 3-4 oraciones). No listes datos técnicos de propiedades en texto cuando los muestres en tarjetas.
- Responde en español, tono profesional y amable.
- Nunca inventes propiedades ni datos del cliente.`;

        // 4. Build message history
        const historial = mensajes.map((m) => ({
            role: m.es_entrante ? ('user' as const) : ('assistant' as const),
            content: m.texto,
        }));

        const messages: any[] = [
            { role: 'system', content: systemPrompt },
            ...historial,
            { role: esEntrante ? 'user' : 'assistant', content: userMessage },
        ];

        // 5. Agentic loop
        let respuesta = '';
        let iteraciones = 0;
        const maxIter = 8;

        while (iteraciones < maxIter) {
            iteraciones++;

            const response = await fetch(OPENROUTER_URL, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${key}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'https://renav.mx',
                    'X-Title': 'RENAV CRM',
                },
                body: JSON.stringify({ model: MODEL, messages, tools: TOOLS, tool_choice: 'auto' }),
            });

            if (!response.ok) throw new Error(`OpenRouter error: ${response.status}`);

            const data = await response.json();
            const choice = data.choices?.[0];
            const msg = choice?.message;

            if (choice?.finish_reason === 'tool_calls' && msg?.tool_calls?.length) {
                messages.push(msg);

                for (const toolCall of msg.tool_calls) {
                    const args = JSON.parse(toolCall.function.arguments || '{}');
                    let result: any;

                    switch (toolCall.function.name) {
                        case 'buscar_propiedades':
                            result = await this.buscarPropiedades(args);
                            break;
                        case 'actualizar_lead':
                            result = await this.actualizarLead(leadId, args);
                            break;
                        case 'actualizar_perfil_inmobiliario':
                            result = await this.actualizarPerfilInmobiliario(leadId, args);
                            break;
                        case 'crear_nota':
                            result = await this.crearNota(leadId, args);
                            break;
                        case 'agendar_cita':
                            result = await this.agendarCita(leadId, args);
                            break;
                        default:
                            result = { error: 'Herramienta desconocida' };
                    }

                    messages.push({
                        role: 'tool',
                        tool_call_id: toolCall.id,
                        content: JSON.stringify(result),
                    });
                }
                continue;
            }

            respuesta = msg?.content?.trim() || 'Gracias por contactarnos, con gusto le atendemos.';
            break;
        }

        // 6. Save AI response to DB
        await this.prisma.crmMensaje.create({
            data: { id_lead: leadId, es_entrante: false, canal: 'AI', texto: respuesta },
        });

        return { respuesta };
    }

    // ── Tool: buscar propiedades ──────────────────────────────────────────────
    private async buscarPropiedades(args: {
        tipo_inmueble?: string; precio_min?: number; precio_max?: number;
        m2_min?: number; m2_max?: number; zona?: string;
    }) {
        const where: any = {};
        if (args.tipo_inmueble) {
            where.tipo_inmueble = { nombre: { contains: args.tipo_inmueble, mode: 'insensitive' } };
        }
        if (args.precio_min !== undefined || args.precio_max !== undefined) {
            where.precios_lista = {};
            if (args.precio_min !== undefined) where.precios_lista.gte = args.precio_min;
            if (args.precio_max !== undefined) where.precios_lista.lte = args.precio_max;
        }
        if (args.m2_min !== undefined || args.m2_max !== undefined) {
            where.m2_construccion = {};
            if (args.m2_min !== undefined) where.m2_construccion.gte = args.m2_min;
            if (args.m2_max !== undefined) where.m2_construccion.lte = args.m2_max;
        }
        if (args.zona) {
            where.desarrollo = { zona: { nombre: { contains: args.zona, mode: 'insensitive' } } };
        }
        where.estado_unidad = { nombre: { contains: 'disponible', mode: 'insensitive' } };

        const unidades = await this.prisma.invUnidad.findMany({
            where, take: 5,
            include: { desarrollo: { include: { zona: true } }, tipo_inmueble: true, estado_unidad: true, tipologia: true },
            orderBy: { precios_lista: 'asc' },
        });

        if (unidades.length === 0) {
            const fallback = await this.prisma.invUnidad.findMany({
                where: { estado_unidad: { nombre: { contains: 'disponible', mode: 'insensitive' } } },
                take: 5,
                include: { desarrollo: { include: { zona: true } }, tipo_inmueble: true, tipologia: true },
                orderBy: { precios_lista: 'asc' },
            });
            return { encontradas: 0, mensaje: 'Sin coincidencias exactas. Alternativas:', propiedades: fallback.map(this.formatUnit) };
        }
        return { encontradas: unidades.length, propiedades: unidades.map(this.formatUnit) };
    }

    // ── Tool: actualizar lead ─────────────────────────────────────────────────
    private async actualizarLead(leadId: number, args: { estado?: string; prioridad?: string }) {
        const data: any = {};
        if (args.estado) data.estado = args.estado;
        if (args.prioridad) data.prioridad = args.prioridad;
        if (Object.keys(data).length === 0) return { ok: false, mensaje: 'Nada que actualizar' };

        await this.prisma.crmLead.update({ where: { id_lead: leadId }, data });
        return { ok: true, actualizado: data };
    }

    // ── Tool: actualizar perfil inmobiliario ──────────────────────────────────
    private async actualizarPerfilInmobiliario(leadId: number, args: {
        tipo_inmueble?: string; ciudad?: string; zona?: string;
        presupuesto_min?: number; presupuesto_max?: number;
        recamaras?: number; banos?: number; m2_requeridos?: number;
    }) {
        // Find or create solicitud for Bienes Raices
        let solicitud = await this.prisma.crmSolicitudServicio.findFirst({
            where: { id_lead: leadId, id_servicio: ID_SERVICIO_BIENES_RAICES },
        });

        if (!solicitud) {
            solicitud = await this.prisma.crmSolicitudServicio.create({
                data: {
                    id_lead: leadId,
                    id_servicio: ID_SERVICIO_BIENES_RAICES,
                    ciudad: args.ciudad,
                    zona: args.zona,
                    presupuesto_min: args.presupuesto_min,
                    presupuesto_max: args.presupuesto_max,
                },
            });
        } else {
            const solData: any = {};
            if (args.ciudad) solData.ciudad = args.ciudad;
            if (args.zona) solData.zona = args.zona;
            if (args.presupuesto_min !== undefined) solData.presupuesto_min = args.presupuesto_min;
            if (args.presupuesto_max !== undefined) solData.presupuesto_max = args.presupuesto_max;
            if (Object.keys(solData).length) {
                await this.prisma.crmSolicitudServicio.update({
                    where: { id_solicitud: solicitud.id_solicitud },
                    data: solData,
                });
            }
        }

        // Resolve tipo_inmueble ID
        const tipoKey = args.tipo_inmueble?.toLowerCase().trim();
        const id_tipo_inmueble = tipoKey ? TIPO_INMUEBLE_MAP[tipoKey] ?? null : null;

        // Upsert bienes_raices preferences
        const brData: any = {};
        if (id_tipo_inmueble) brData.id_tipo_inmueble = id_tipo_inmueble;
        if (args.zona) brData.zona = args.zona;
        if (args.ciudad) brData.ciudad = args.ciudad;
        if (args.recamaras !== undefined) brData.recamaras = args.recamaras;
        if (args.banos !== undefined) brData.banos = args.banos;
        if (args.m2_requeridos !== undefined) brData.m2_construidos_requeridos = args.m2_requeridos;

        if (Object.keys(brData).length) {
            await this.prisma.crmSolicitudBienesRaices.upsert({
                where: { id_solicitud: solicitud.id_solicitud },
                create: { id_solicitud: solicitud.id_solicitud, ...brData },
                update: brData,
            });
        }

        return { ok: true, perfil_guardado: { ...args } };
    }

    // ── Tool: crear nota ──────────────────────────────────────────────────────
    private async crearNota(leadId: number, args: { descripcion: string; tipo?: string }) {
        await this.prisma.crmActividad.create({
            data: {
                id_lead: leadId,
                tipo: args.tipo || 'NOTE',
                descripcion: args.descripcion,
            },
        });
        return { ok: true, nota: args.descripcion };
    }

    // ── Tool: agendar cita ────────────────────────────────────────────────────
    private async agendarCita(leadId: number, args: { descripcion: string; fecha_iso?: string }) {
        await this.prisma.crmActividad.create({
            data: {
                id_lead: leadId,
                tipo: 'CITA',
                descripcion: args.descripcion,
                programada_para: args.fecha_iso ? new Date(args.fecha_iso) : null,
            },
        });
        return { ok: true, cita: args.descripcion, fecha: args.fecha_iso || 'por confirmar' };
    }

    // ── Format inventory unit ─────────────────────────────────────────────────
    private formatUnit(u: any) {
        return {
            codigo: u.codigo_unidad,
            desarrollo: u.desarrollo?.nombre,
            zona: u.desarrollo?.zona?.nombre,
            tipo: u.tipo_inmueble?.nombre,
            tipologia: u.tipologia?.nombre,
            m2_construccion: u.m2_construccion ? Number(u.m2_construccion) : null,
            m2_terreno: u.m2_terreno ? Number(u.m2_terreno) : null,
            precio: u.precios_lista ? Number(u.precios_lista) : null,
            moneda: u.moneda,
            piso: u.nivel_piso,
            estado: u.estado_unidad?.nombre,
        };
    }
}
