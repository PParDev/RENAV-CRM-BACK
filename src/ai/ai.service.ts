import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../database/prisma.service';
import { EventsService } from '../events/events.service';

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'openai/gpt-4o-mini';

// Catalog constants
const ID_SERVICIO_BIENES_RAICES = 9;


@Injectable()
export class AiService implements OnModuleInit {
    // Mapa nombre/codigo → id_tipo_inmueble cargado desde BD al arrancar
    private tipoInmuebleMap: Record<string, number> = {};
    // Lista de nombres de tipos para el prompt de la IA
    private tipoInmuebleNombres: string[] = [];

    constructor(
        private readonly prisma: PrismaService,
        private readonly config: ConfigService,
        private readonly eventsService: EventsService,
    ) {}

    async onModuleInit() {
        await this.cargarTiposInmueble();
    }

    private async cargarTiposInmueble() {
        try {
            const tipos = await this.prisma.catTipoInmueble.findMany();
            this.tipoInmuebleMap = {};
            this.tipoInmuebleNombres = [];
            for (const t of tipos) {
                const nombre = t.nombre.toLowerCase().trim();
                const codigo = t.codigo.toLowerCase().trim();
                this.tipoInmuebleMap[nombre] = t.id_tipo_inmueble;
                this.tipoInmuebleMap[codigo] = t.id_tipo_inmueble;
                this.tipoInmuebleNombres.push(t.nombre);
            }
            // Alias comunes
            if (this.tipoInmuebleMap['departamento'] && !this.tipoInmuebleMap['depto']) {
                this.tipoInmuebleMap['depto'] = this.tipoInmuebleMap['departamento'];
            }
        } catch (err) {
            console.warn('[AiService] No se pudo cargar catálogo de tipos de inmueble:', (err as Error).message);
        }
    }

    // ── Build tools with dynamic tipo_inmueble values ────────────────────────
    private buildTools() {
        const tiposDesc = this.tipoInmuebleNombres.length
            ? this.tipoInmuebleNombres.join(', ')
            : 'casa, departamento, lote, bodega';

        return [
            {
                type: 'function',
                function: {
                    name: 'buscar_propiedades',
                    description:
                        'Busca propiedades disponibles en el inventario de RENAV según los criterios del cliente. Úsala cuando el cliente pregunte por opciones, precios, zonas, tamaños o tipos de inmueble.',
                    parameters: {
                        type: 'object',
                        properties: {
                            tipo_inmueble: { type: 'string', description: `Tipo de inmueble. Valores posibles: ${tiposDesc}` },
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
                        'Actualiza el estado y/o prioridad del lead según el nivel de interés y calificación detectado en la conversación.',
                    parameters: {
                        type: 'object',
                        properties: {
                            estado: {
                                type: 'string',
                                enum: ['NUEVO', 'EN PROCESO', 'CALIFICADO', 'CERRADO', 'DESCARTADO', 'PERDIDO'],
                            },
                            prioridad: {
                                type: 'string',
                                enum: ['BAJA', 'MEDIA', 'ALTA', 'URGENTE'],
                                description: 'BAJA=solo curiosidad, MEDIA=interés real sin urgencia, ALTA=presupuesto + plazo claros, URGENTE=quiere visitar o comprar ya',
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
                            tipo_inmueble: { type: 'string', description: `Tipo de inmueble. Valores posibles: ${tiposDesc}` },
                            ciudad: { type: 'string' },
                            zona: { type: 'string' },
                            presupuesto_min: { type: 'number' },
                            presupuesto_max: { type: 'number' },
                            recamaras: { type: 'number' },
                            banos: { type: 'number' },
                            m2_requeridos: { type: 'number' },
                            motivacion: { type: 'string', description: 'Por qué busca comprar o invertir (ej. "Para vivir", "Inversión para rentar", "Vacacional")' },
                            temporalidad: { type: 'string', description: 'Para cuándo espera concretar la compra o mudanza (ej. "En 3 meses", "Inmediatamente", "El próximo año")' },
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
                        'Crea una nota interna o registra una llamada/tarea en el historial del lead.',
                    parameters: {
                        type: 'object',
                        properties: {
                            descripcion: { type: 'string', description: 'Contenido de la nota' },
                            tipo: {
                                type: 'string',
                                enum: ['NOTE', 'CALL', 'TASK', 'WHATSAPP', 'EMAIL'],
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
            {
                type: 'function',
                function: {
                    name: 'actualizar_contexto',
                    description:
                        'Guarda un resumen acumulativo y actualizado de todo lo que conoces del cliente. Llama esta herramienta al final de CADA respuesta para mantener tu memoria entre conversaciones.',
                    parameters: {
                        type: 'object',
                        properties: {
                            resumen: {
                                type: 'string',
                                description: 'Resumen completo y actualizado. Incluye: situación personal, motivaciones de compra, objeciones, disponibilidad, tono de comunicación, preferencias no estructuradas, señales de intención. Este texto REEMPLAZA el contexto anterior — debe ser acumulativo y mejorado.',
                            },
                        },
                        required: ['resumen'],
                    },
                },
            },
            {
                type: 'function',
                function: {
                    name: 'solicitar_agente_humano',
                    description:
                        'Marca el lead como prioritario y genera una alerta para que un agente humano tome el control. Úsala cuando: el cliente quiera negociar precio, hacer una oferta formal, visitar una propiedad específica, tiene una urgencia real, o cuando la conversación supera tu capacidad como IA.',
                    parameters: {
                        type: 'object',
                        properties: {
                            motivo: {
                                type: 'string',
                                description: 'Razón por la que se requiere agente humano (ej: "Cliente listo para visitar unidad A-302 en Desarrollo X, precio negociable")',
                            },
                            urgente: {
                                type: 'boolean',
                                description: 'true si el cliente necesita atención en menos de 24h (quiere visitar hoy, tiene oferta activa, etc.)',
                            },
                        },
                        required: ['motivo'],
                    },
                },
            },
            {
                type: 'function',
                function: {
                    name: 'clasificar_cliente',
                    description:
                        'Clasifica la temperatura/nivel de interés del cliente basándote en las señales observadas durante la conversación. Llama cuando detectes cambio significativo en el nivel de engagement.',
                    parameters: {
                        type: 'object',
                        properties: {
                            temperatura: {
                                type: 'string',
                                enum: ['FRIO', 'TIBIO', 'CALIENTE', 'MUY_CALIENTE'],
                                description: 'FRIO=primer contacto sin datos, TIBIO=interés pero sin urgencia, CALIENTE=perfil sólido con intención, MUY_CALIENTE=listo para visita/oferta',
                            },
                            senales: {
                                type: 'string',
                                description: 'Señales observadas que justifican la clasificación (ej: "Tiene presupuesto definido, zona clara, preguntó por disponibilidad")',
                            },
                            accion_sugerida: {
                                type: 'string',
                                description: 'Acción recomendada para el agente humano (ej: "Contactar en 24h para agendar visita", "Enviar brochure del desarrollo X")',
                            },
                            sentimiento: {
                                type: 'string',
                                enum: ['POSITIVO', 'NEUTRAL', 'INDECISO', 'MOLESTO'],
                                description: 'Estado de ánimo actual del cliente durante la conversación',
                            },
                            etiquetas: {
                                type: 'array',
                                items: { type: 'string' },
                                description: 'Etiquetas clave que definen al cliente (ej. "Inversionista", "Familia", "Busca crédito", "Extranjero", "Urgente")'
                            },
                        },
                        required: ['temperatura', 'senales'],
                    },
                },
            },
            {
                type: 'function',
                function: {
                    name: 'registrar_objecion',
                    description:
                        'Registra una objeción, duda o barrera expresada por el cliente. Útil para que el agente humano sepa qué resistencias abordar.',
                    parameters: {
                        type: 'object',
                        properties: {
                            tipo_objecion: {
                                type: 'string',
                                enum: ['PRECIO', 'UBICACION', 'TIEMPO', 'FINANCIAMIENTO', 'DESCONFIANZA', 'INDECISION', 'COMPETENCIA', 'OTRO'],
                                description: 'Categoría de la objeción',
                            },
                            descripcion: {
                                type: 'string',
                                description: 'Descripción detallada de la objeción en palabras del cliente',
                            },
                            respuesta_dada: {
                                type: 'string',
                                description: 'Cómo respondiste a la objeción (para que el agente dé seguimiento consistente)',
                            },
                        },
                        required: ['tipo_objecion', 'descripcion'],
                    },
                },
            },
            {
                type: 'function',
                function: {
                    name: 'enviar_ficha_tecnica',
                    description: 'Envía una ficha técnica (imagen o PDF) al cliente. Úsala cuando el cliente acepta conocer más sobre una opción.',
                    parameters: {
                        type: 'object',
                        properties: {
                            codigo_unidad: { type: 'string', description: 'Código de la unidad a enviar (ej. PROJ-101)' },
                            mensaje_intro: { type: 'string', description: 'Opcional. Mensaje introductorio que acompaña la imagen.' }
                        },
                        required: ['codigo_unidad'],
                    },
                },
            },
            {
                type: 'function',
                function: {
                    name: 'enviar_mensaje_interactivo',
                    description: 'Envíale al cliente un mensaje con opciones rápidas (botones). Úsalo para que le sea más fácil responder.',
                    parameters: {
                        type: 'object',
                        properties: {
                            texto: { type: 'string', description: 'El texto principal que acompaña a los botones' },
                            opciones: { 
                                type: 'array', items: { type: 'string' }, description: 'Máximo 3 opciones cortas (ej. "Agendar Visita", "Hablemos de precios")' 
                            }
                        },
                        required: ['texto', 'opciones'],
                    },
                },
            },
        ];
    }

    // ── Main entry point ─────────────────────────────────────────────────────
    async chat(leadId: number, userMessage: string, esEntrante: boolean): Promise<{ respuesta: string, messageId: number, botones?: string[], mediaUrl?: string, mediaCaption?: string }> {
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

        // 2. Load last 20 messages (newest first, then reverse for chronological order)
        const mensajes = await this.prisma.crmMensaje.findMany({
            where: { id_lead: leadId },
            orderBy: { creado_en: 'desc' },
            take: 20,
        });
        mensajes.reverse();

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

        const contextoCliente = lead?.contexto_ia
            ? `\n*MEMORIA DEL CLIENTE (de conversaciones anteriores):*\n${lead.contexto_ia}\n`
            : '';

        // ── Dynamic profiling checklist ──────────────────────────────────
        const checklist = {
            nombre: lead?.contacto?.nombre && lead.contacto.nombre !== 'cliente' ? `✅ ${lead.contacto.nombre}` : '❌ Nombre',
            telefono: lead?.contacto?.telefono ? '✅ Teléfono' : '❌ Teléfono',
            correo: lead?.contacto?.correo ? '✅ Correo' : '❌ Correo',
            tipo_inmueble: br?.tipo_inmueble?.nombre ? `✅ ${br.tipo_inmueble.nombre}` : '❌ Tipo de inmueble',
            zona: br?.zona || sol?.zona ? `✅ ${br?.zona || sol?.zona}` : '❌ Zona/ubicación',
            ciudad: br?.ciudad || sol?.ciudad ? `✅ ${br?.ciudad || sol?.ciudad}` : '❌ Ciudad',
            presupuesto: sol?.presupuesto_max || sol?.presupuesto_min ? `✅ $${sol?.presupuesto_min || '?'}-$${sol?.presupuesto_max || '?'}` : '❌ Presupuesto',
            recamaras: br?.recamaras ? `✅ ${br.recamaras} recámaras` : '❌ Recámaras',
            m2: br?.m2_construidos_requeridos ? `✅ ${br.m2_construidos_requeridos}m²` : '❌ M² deseados',
            motivacion: (br as any)?.motivacion ? `✅ ${(br as any).motivacion}` : '❌ Motivación de compra (¿por qué busca?, ¿para vivir/inversión?)',
            temporalidad: (br as any)?.temporalidad ? `✅ ${(br as any).temporalidad}` : '❌ Temporalidad (¿cuándo quiere comprar/mudarse?)',
        };

        // Count gathered vs missing
        const gathered = Object.values(checklist).filter(v => v.startsWith('✅')).length;
        const total = Object.keys(checklist).length;
        const checklistStr = Object.values(checklist).join('\n');

        // Determine conversation phase based on data completeness
        let fase: string;
        if (gathered <= 2) {
            fase = 'FASE 1 — SALUDO Y DESCUBRIMIENTO: Preséntate brevemente y haz UNA pregunta abierta para entender qué busca el cliente. Ejemplo: "¿Qué tipo de propiedad te interesa?" o "¿Cuéntame, qué estás buscando?"';
        } else if (gathered <= 5) {
            fase = 'FASE 2 — PERFILAMIENTO: Ya sabes algo del cliente. Haz preguntas naturales para llenar los campos faltantes del checklist. NO hagas más de 1-2 preguntas por mensaje. Intercala con comentarios relevantes sobre lo que ya sabes.';
        } else if (gathered <= 8) {
            fase = 'FASE 3 — CALIFICACIÓN Y RECOMENDACIÓN: Tienes suficiente perfil. Busca propiedades que coincidan y preséntalas. Pregunta sobre temporalidad e intención de compra si no las tienes.';
        } else {
            fase = 'FASE 4 — CIERRE: Perfil casi completo. Enfócate en proponer visitas, agendar citas, y conectar con el agente humano. Sé proactivo sugiriendo próximos pasos.';
        }

        // Determine temperature label
        let temperatura: string;
        if (gathered <= 2) temperatura = '🔵 FRÍO — Primer contacto o muy poca información';
        else if (gathered <= 5) temperatura = '🟡 TIBIO — Interés detectado, perfil incompleto';
        else if (gathered <= 8) temperatura = '🟠 CALIENTE — Perfil sólido, necesita propuesta';
        else temperatura = '🔴 MUY CALIENTE — Listo para visita/cierre';

        const systemPrompt = `Eres *Maya*, asesora virtual de RENAV Real Estate Group. Eres experta en bienes raíces en la zona de Colima/Manzanillo. Tu personalidad: profesional, cálida, empática, y directa. Nunca suenas robótica ni genérica.

═══════════════════════════════════════
📋 DATOS DEL LEAD
═══════════════════════════════════════
- Nombre: ${lead?.contacto?.nombre || 'No identificado'}
- Estado CRM: ${lead?.estado || 'NUEVO'} | Prioridad: ${lead?.prioridad || 'MEDIA'}
- Temperatura: ${temperatura}
- Perfil registrado: ${perfil}
${contextoCliente}
═══════════════════════════════════════
📊 CHECKLIST DE PERFILAMIENTO (${gathered}/${total})
═══════════════════════════════════════
${checklistStr}

═══════════════════════════════════════
🎯 FASE ACTUAL
═══════════════════════════════════════
${fase}

═══════════════════════════════════════
🧠 ESTRATEGIA CONVERSACIONAL
═══════════════════════════════════════
1. *Extracción natural*: NUNCA hagas listas de preguntas ni interrogatorios. Extrae información de forma conversacional. En vez de "¿Cuál es tu presupuesto?", di algo como "Para darte las mejores opciones, ¿más o menos en qué rango de inversión estás pensando?"
2. *Máximo 1-2 preguntas por mensaje*: Intercala con valor (dato del mercado, observación, validación de lo que dijo el cliente).
3. *Escucha activa*: Siempre refleja lo que el cliente dijo antes de preguntar algo nuevo. Ejemplo: "Entiendo, una casa en Manzanillo para tu familia suena increíble. ¿Y más o menos cuántas recámaras necesitarían?"
4. *Manejo de objeciones*: Si el cliente duda, empatiza primero, luego reencuadra. Si dice "es muy caro", no bajes precio — pregunta qué valor espera y busca alternativas.
5. *Urgencia natural*: Si hay propiedades que coinciden con su perfil, menciona disponibilidad ("Hay pocas unidades en esa zona, te las comparto para que las veas").
6. *Transición a agente humano*: Cuando el cliente quiera visitar, negociar precio, o hacer una oferta formal, sugiere conectar con un asesor humano de RENAV.

═══════════════════════════════════════
🔧 REGLAS DE HERRAMIENTAS (OBLIGATORIAS)
═══════════════════════════════════════
- *actualizar_perfil_inmobiliario*: Llama INMEDIATAMENTE cuando el cliente mencione tipo de inmueble, zona, presupuesto, recámaras o m². Convierte: "4 millones" → 4000000, "500 mil" → 500000.
- *actualizar_lead*: Llama cuando detectes cambio en interés o intención. Criterios:
  • BAJA: curiosidad, sin datos concretos
  • MEDIA: interés real pero sin urgencia ni presupuesto definido
  • ALTA: presupuesto + zona + tipo claros
  • URGENTE: quiere visitar, hacer oferta o comprar ya
- *buscar_propiedades*: Llama cuando tengas al menos tipo + (zona O presupuesto). Muestra máximo 3 opciones destacadas.
- *agendar_cita*: Llama cuando el cliente quiera ver propiedades o reunirse.
- *clasificar_cliente*: Llama cuando tengas suficiente información para determinar la temperatura del lead. Siempre incluye las 'etiquetas' y el 'sentimiento' actual del lead.
- *registrar_objecion*: Llama cuando el cliente exprese una duda, barrera o resistencia (precio alto, indecisión, mala experiencia previa, etc.).
- *solicitar_agente_humano*: Llama cuando el cliente quiera negociar precio, hacer una oferta, visitar una propiedad específica, o cuando necesite atención especializada que supere tu capacidad. Siempre di al cliente que un asesor lo contactará pronto.
- *crear_nota*: Llama con datos clave descubiertos que el agente humano debe saber.
- *actualizar_contexto*: Llama al final de CADA respuesta con un resumen acumulativo y mejorado de todo lo que sabes del cliente. Este es tu "cuaderno de notas" para no olvidar nada entre conversaciones.
- NUNCA digas "voy a registrar" o "voy a guardar" — simplemente hazlo silenciosamente.

═══════════════════════════════════════
✍️ FORMATO
═══════════════════════════════════════
- Formato WhatsApp: *negritas* con un asterisco, _cursiva_ con guión bajo.
- Máximo 3-4 oraciones por respuesta. Sé concisa pero cálida.
- Español, tono profesional and cercano. Tutea al cliente.
- NUNCA inventes propiedades ni datos. Solo comparte lo que devuelve buscar_propiedades.
- Cuando muestres propiedades, destaca: nombre del desarrollo, zona, tipo, precio y un dato diferenciador.`;

        // 4. Build message history (last 20, already ordered chronologically)
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
        
        let botonesSalida: string[] | undefined;
        let mediaUrlSalida: string | undefined;
        let mediaCaptionSalida: string | undefined;

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
                body: JSON.stringify({ model: MODEL, messages, tools: this.buildTools(), tool_choice: 'auto' }),
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
                        case 'actualizar_contexto':
                            result = await this.actualizarContexto(leadId, args);
                            break;
                        case 'solicitar_agente_humano':
                            result = await this.solicitarAgenteHumano(leadId, args);
                            break;
                        case 'clasificar_cliente':
                            result = await this.clasificarCliente(leadId, args);
                            break;
                        case 'registrar_objecion':
                            result = await this.registrarObjecion(leadId, args);
                            break;
                        case 'enviar_ficha_tecnica':
                            const unidadUrl = await this.enviarFichaTecnica(args);
                            if (unidadUrl.url) {
                                mediaUrlSalida = unidadUrl.url;
                                mediaCaptionSalida = args.mensaje_intro || `Ficha técnica ${args.codigo_unidad}`;
                                result = { ok: true, info: "La ficha se adjuntará. Asegúrate de incluir un texto de acompañamiento en tu respuesta final de texto." };
                            } else {
                                result = { error: "No se encontró imagen o ficha para esta unidad." };
                            }
                            break;
                        case 'enviar_mensaje_interactivo':
                            botonesSalida = args.opciones;
                            result = { ok: true, info: `Botones listos para adjuntar: [${args.opciones.join(', ')}]. Usa un mensaje conciso de texto para acompañarlos.` };
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
        const msgRecord = await this.prisma.crmMensaje.create({
            data: { id_lead: leadId, es_entrante: false, canal: 'AI', texto: respuesta },
        });

        // Notify frontend: AI response ready
        this.eventsService.emit({
            type: 'nuevo_mensaje',
            payload: {
                id_lead: leadId,
                id_mensaje: msgRecord.id_mensaje,
                texto: respuesta,
                es_entrante: false,
                canal: 'AI',
                creado_en: msgRecord.creado_en,
                es_ai: true
            },
        });

        // 7. Auto-transition: if the lead is still NUEVO, move it to EN PROCESO
        //    (Note: Incoming message should have already done this, but we do it for robustness)
        if (lead?.estado === 'NUEVO') {
            await this.prisma.crmLead.update({
                where: { id_lead: leadId },
                data: { estado: 'EN PROCESO' },
            });
            this.eventsService.emit({ type: 'lead_actualizado', payload: { id_lead: leadId, estado: 'EN PROCESO' } });
        }

        return { 
            respuesta, 
            messageId: msgRecord.id_mensaje, 
            botones: botonesSalida, 
            mediaUrl: mediaUrlSalida, 
            mediaCaption: mediaCaptionSalida 
        };
    }

    // ── Tool: buscar propiedades ──────────────────────────────────────────────
    private async buscarPropiedades(args: {
        tipo_inmueble?: string; precio_min?: number; precio_max?: number;
        m2_min?: number; m2_max?: number; zona?: string;
    }) {
        const buildWhere = (strict: boolean) => {
            const where: any = {};
            if (args.tipo_inmueble) {
                where.tipo_inmueble = { nombre: { contains: args.tipo_inmueble, mode: 'insensitive' } };
            }
            if (args.precio_min !== undefined || args.precio_max !== undefined) {
                where.precios_lista = {};
                if (args.precio_min !== undefined) where.precios_lista.gte = strict ? args.precio_min : args.precio_min * 0.85; // Ampliación -15%
                if (args.precio_max !== undefined) where.precios_lista.lte = strict ? args.precio_max : args.precio_max * 1.15; // Ampliación +15%
            }
            if (strict && (args.m2_min !== undefined || args.m2_max !== undefined)) {
                where.m2_construccion = {};
                if (args.m2_min !== undefined) where.m2_construccion.gte = args.m2_min;
                if (args.m2_max !== undefined) where.m2_construccion.lte = args.m2_max;
            }
            if (strict && args.zona) {
                where.desarrollo = { zona: { nombre: { contains: args.zona, mode: 'insensitive' } } };
            } else if (!strict && args.zona) {
                // Modo flexible: se permite cualquier zona temporalmente si el precio/tipo concuerda.
            }
            where.estado_unidad = { nombre: { contains: 'disponible', mode: 'insensitive' } };
            return where;
        };

        // Intento Estricto
        const unidades = await this.prisma.invUnidad.findMany({
            where: buildWhere(true), take: 5,
            include: { desarrollo: { include: { zona: true } }, tipo_inmueble: true, estado_unidad: true, tipologia: true },
            orderBy: { precios_lista: 'asc' },
        });

        if (unidades.length === 0) {
            // Intento Flexible (amplía precio +-15% y retira estrictez de zona y m2)
            const fuzzyUnidades = await this.prisma.invUnidad.findMany({
                where: buildWhere(false), take: 5,
                include: { desarrollo: { include: { zona: true } }, tipo_inmueble: true, tipologia: true, estado_unidad: true },
                orderBy: { precios_lista: 'asc' },
            });
            if (fuzzyUnidades.length === 0) {
                 const fallback = await this.prisma.invUnidad.findMany({
                    where: { estado_unidad: { nombre: { contains: 'disponible', mode: 'insensitive' } } },
                    take: 5,
                    include: { desarrollo: { include: { zona: true } }, tipo_inmueble: true, tipologia: true },
                    orderBy: { precios_lista: 'asc' },
                });
                return { tipo_match: 'NINGUNO', encontradas: 0, mensaje: 'Sin coincidencias. Las siguientes son alternativas disponibles recomendadas al azar:', propiedades: fallback.map(u => this.formatUnit(u)) };
            }
            return { tipo_match: 'FLEXIBLE', encontradas: fuzzyUnidades.length, mensaje: 'Opciones SIMILARES. Estirado tu margen de precio en ±15% y buscando zonas aledañas:', propiedades: fuzzyUnidades.map(u => this.formatUnit(u)) };
        }
        return { tipo_match: 'EXACTO', encontradas: unidades.length, propiedades: unidades.map(u => this.formatUnit(u)) };
    }

    private async enviarFichaTecnica(args: { codigo_unidad: string }) {
        const unidad = await this.prisma.invUnidad.findFirst({
            where: { codigo_unidad: { contains: args.codigo_unidad, mode: 'insensitive' } }
        });
        return { url: unidad?.imagen_url };
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
        motivacion?: string; temporalidad?: string;
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

        // Resolve tipo_inmueble ID desde el mapa cargado en BD
        const tipoKey = args.tipo_inmueble?.toLowerCase().trim();
        const id_tipo_inmueble = tipoKey ? (this.tipoInmuebleMap[tipoKey] ?? null) : null;
        if (tipoKey && !id_tipo_inmueble) {
            console.warn(`[AiService] tipo_inmueble "${tipoKey}" no encontrado en catálogo`);
        }

        // Upsert bienes_raices preferences
        const brData: any = {};
        if (id_tipo_inmueble) brData.id_tipo_inmueble = id_tipo_inmueble;
        if (args.zona) brData.zona = args.zona;
        if (args.ciudad) brData.ciudad = args.ciudad;
        if (args.recamaras !== undefined) brData.recamaras = args.recamaras;
        if (args.banos !== undefined) brData.banos = args.banos;
        if (args.m2_requeridos !== undefined) brData.m2_construidos_requeridos = args.m2_requeridos;
        if (args.motivacion) brData.motivacion = args.motivacion;
        if (args.temporalidad) brData.temporalidad = args.temporalidad;

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

    // ── Tool: actualizar contexto del cliente ─────────────────────────────────
    private async actualizarContexto(leadId: number, args: { resumen: string }) {
        await this.prisma.crmLead.update({
            where: { id_lead: leadId },
            data: { contexto_ia: args.resumen },
        });
        return { ok: true };
    }

    // ── Tool: solicitar agente humano ─────────────────────────────────────────
    private async solicitarAgenteHumano(leadId: number, args: { motivo: string; urgente?: boolean }) {
        const data: any = { prioridad: args.urgente ? 'URGENTE' : 'ALTA' };

        const [lead] = await Promise.all([
            this.prisma.crmLead.findUnique({
                where: { id_lead: leadId },
                select: { contacto: { select: { nombre: true } } },
            }),
            this.prisma.crmLead.update({ where: { id_lead: leadId }, data }),
        ]);

        const nota = `🚨 REQUIERE AGENTE HUMANO\n${args.motivo}${args.urgente ? '\n⏰ URGENTE — requiere atención en menos de 24h' : ''}`;
        await this.prisma.crmActividad.create({
            data: { id_lead: leadId, tipo: 'NOTE', descripcion: nota },
        });

        // Notify all connected CRM clients via SSE
        this.eventsService.emit({
            type: 'agente_requerido',
            payload: {
                leadId,
                contacto: lead?.contacto?.nombre || `Lead #${leadId}`,
                motivo: args.motivo,
                urgente: args.urgente ?? false,
            },
        });

        return { ok: true, alerta_creada: true, prioridad: data.prioridad };
    }

    // ── Tool: clasificar cliente (temperatura) ─────────────────────────────────
    private async clasificarCliente(leadId: number, args: {
        temperatura: string; senales: string; accion_sugerida?: string;
        sentimiento?: string; etiquetas?: string[];
    }) {
        // Map temperature to lead priority + state
        const tempMap: Record<string, { prioridad: string; estado?: string }> = {
            'FRIO': { prioridad: 'BAJA' },
            'TIBIO': { prioridad: 'MEDIA', estado: 'EN PROCESO' },
            'CALIENTE': { prioridad: 'ALTA', estado: 'EN PROCESO' },
            'MUY_CALIENTE': { prioridad: 'URGENTE', estado: 'CALIFICADO' },
        };

        const mapping = tempMap[args.temperatura] || { prioridad: 'MEDIA' };
        const data: any = { prioridad: mapping.prioridad };
        if (mapping.estado) data.estado = mapping.estado;
        if (args.sentimiento) data.sentimiento = args.sentimiento;
        if (args.etiquetas && args.etiquetas.length > 0) data.etiquetas_ia = args.etiquetas;

        await this.prisma.crmLead.update({ where: { id_lead: leadId }, data });

        // Create internal note with the classification
        const notaTexto = `🌡️ Clasificación: ${args.temperatura}\nSeñales: ${args.senales}${args.accion_sugerida ? `\nAcción sugerida: ${args.accion_sugerida}` : ''}${args.sentimiento ? `\nSentimiento: ${args.sentimiento}` : ''}${args.etiquetas?.length ? `\nEtiquetas: ${args.etiquetas.join(', ')}` : ''}`;
        await this.prisma.crmActividad.create({
            data: { id_lead: leadId, tipo: 'NOTE', descripcion: notaTexto },
        });

        return { ok: true, temperatura: args.temperatura, lead_actualizado: data };
    }

    // ── Tool: registrar objeción ──────────────────────────────────────────────
    private async registrarObjecion(leadId: number, args: {
        tipo_objecion: string; descripcion: string; respuesta_dada?: string;
    }) {
        const notaTexto = `⚠️ Objeción [${args.tipo_objecion}]: ${args.descripcion}${args.respuesta_dada ? `\nRespuesta dada por Maya: ${args.respuesta_dada}` : ''}`;
        await this.prisma.crmActividad.create({
            data: { id_lead: leadId, tipo: 'NOTE', descripcion: notaTexto },
        });

        return { ok: true, objecion_registrada: args.tipo_objecion };
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
