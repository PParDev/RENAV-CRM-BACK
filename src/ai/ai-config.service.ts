import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export interface AiConfig {
    // Identidad y tono
    nombre_asistente: string;
    empresa: string;
    zona_operacion: string;
    tono: 'formal' | 'amigable' | 'casual';
    idioma_tuteo: boolean;

    // Control de mensajes
    max_oraciones: number;       // Máx oraciones por respuesta (2-6)
    longitud: 'corto' | 'medio' | 'largo';
    emojis_permitidos: boolean;
    formato_whatsapp: boolean;   // *negritas*, _cursiva_

    // Reglas de Estilo (validar tono/lenguaje)
    control_lenguaje_activo: boolean;
    frases_prohibidas: string[];   // Frases que Maya NO debe decir
    frases_obligatorias: string[]; // Frases o conceptos que siempre debe incluir
    instrucciones_estilo: string;   // Instrucciones libres del Arquitecto

    // Servicios prioritarios
    servicios_activos: {
        bienes_raices: boolean;
        arquitectura: boolean;
        construccion: boolean;
        avaluo: boolean;
    };

    // Perfilamiento
    preguntar_motivacion: boolean;     // ¿Para invertir o para vivir?
    preguntar_financiamiento: boolean; // ¿Cómo piensa pagar?
    preguntar_urgencia: boolean;       // ¿Para cuándo?
    preguntar_capacidad_compra: boolean;

    // Comportamiento de cierre
    proponer_cita_automatica: boolean;   // ¿Proponer visita proactivamente?
    umbral_cita: number;                 // Campos completos antes de proponer cita (0-11)
    activar_agente_temp: 'CALIENTE' | 'MUY_CALIENTE'; // Temperatura mínima para activar agente

    // Instrucciones personalizadas finales
    instrucciones_personalizadas: string;
}

const DEFAULT_CONFIG: AiConfig = {
    nombre_asistente: 'Maya',
    empresa: 'RENAV Real Estate Group',
    zona_operacion: 'Colima y Manzanillo',
    tono: 'amigable',
    idioma_tuteo: true,

    max_oraciones: 3,
    longitud: 'corto',
    emojis_permitidos: false,
    formato_whatsapp: true,

    control_lenguaje_activo: true,
    frases_prohibidas: [
        'No hay problema',
        'Le comento',
        'Como asesora virtual',
        'Lo que necesites',
        'Aquí estoy para servirle',
        'Desde luego',
        'Con mucho gusto',
        'Sería un placer',
    ],
    frases_obligatorias: [],
    instrucciones_estilo: '',

    servicios_activos: {
        bienes_raices: true,
        arquitectura: true,
        construccion: true,
        avaluo: true,
    },

    preguntar_motivacion: true,
    preguntar_financiamiento: true,
    preguntar_urgencia: true,
    preguntar_capacidad_compra: true,

    proponer_cita_automatica: true,
    umbral_cita: 7,
    activar_agente_temp: 'CALIENTE',

    instrucciones_personalizadas: '',
};

@Injectable()
export class AiConfigService {
    private readonly configPath: string;

    constructor() {
        this.configPath = path.join(process.cwd(), 'ai-config.json');
    }

    getConfig(): AiConfig {
        try {
            if (fs.existsSync(this.configPath)) {
                const raw = fs.readFileSync(this.configPath, 'utf-8');
                const data = JSON.parse(raw);

                // Migración: Si existen campos antiguos (arq_*), moverlos a los nuevos
                if (data.arq_validacion !== undefined && data.control_lenguaje_activo === undefined) {
                    data.control_lenguaje_activo = data.arq_validacion;
                }
                if (data.arq_frases_prohibidas !== undefined && data.frases_prohibidas === undefined) {
                    data.frases_prohibidas = data.arq_frases_prohibidas;
                }
                if (data.arq_frases_obligatorias !== undefined && data.frases_obligatorias === undefined) {
                    data.frases_obligatorias = data.arq_frases_obligatorias;
                }
                if (data.arq_instrucciones_extra !== undefined && data.instrucciones_estilo === undefined) {
                    data.instrucciones_estilo = data.arq_instrucciones_extra;
                }

                return { ...DEFAULT_CONFIG, ...data };
            }
        } catch {
            // return default on parse error
        }
        return { ...DEFAULT_CONFIG };
    }

    updateConfig(partial: Partial<AiConfig>): AiConfig {
        const current = this.getConfig();
        const updated = { ...current, ...partial };
        fs.writeFileSync(this.configPath, JSON.stringify(updated, null, 2), 'utf-8');
        return updated;
    }

    resetConfig(): AiConfig {
        fs.writeFileSync(this.configPath, JSON.stringify(DEFAULT_CONFIG, null, 2), 'utf-8');
        return { ...DEFAULT_CONFIG };
    }
}
