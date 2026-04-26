
import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { WhatsappSenderService } from '../../whatsapp/whatsapp-sender.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { CrmActividad } from '@prisma/client';

@Injectable()
export class ActivitiesService {
    private readonly logger = new Logger(ActivitiesService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly whatsappSender: WhatsappSenderService,
    ) { }

    // Crea una nueva actividad (llamada, nota, tarea, etc.) asociada a un lead
    async create(createActivityDto: CreateActivityDto): Promise<CrmActividad> {
        const { tipo, ...rest } = createActivityDto;

        // Política de Cita Única
        if (tipo === 'CITA' && rest.programada_para) {
            await this.prisma.crmActividad.updateMany({
                where: { 
                    id_lead: rest.id_lead, 
                    tipo: 'CITA', 
                    // Limpiamos las "por confirmar" o viejas citas si hay una fecha firme nueva
                    activo: true 
                },
                data: { activo: false }
            });
        }

        const activity = await this.prisma.crmActividad.create({
            data: { ...rest, tipo },
        });

        // Enviar WhatsApp con Calendar Link si es CITA con fecha
        if (tipo === 'CITA' && rest.programada_para) {
            this.sendCitaConfirmation(rest.id_lead, new Date(rest.programada_para), rest.descripcion || undefined).catch(e => this.logger.error(e));
        }

        return activity;
    }

    private async sendCitaConfirmation(id_lead: number, dateObj: Date, descripcion?: string) {
        const lead = await this.prisma.crmLead.findUnique({
            where: { id_lead },
            include: { contacto: true }
        });

        if (!lead || !lead.contacto?.telefono) return;

        const start = dateObj;
        const end = new Date(start.getTime() + 60 * 60 * 1000); // 1 hora de duración
        const fmtDate = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");
        const location = encodeURIComponent("Renâv Real Estate Group");
        const details = encodeURIComponent(descripcion || "Cita de asesoramiento inmobiliario.");
        const title = encodeURIComponent("Visita Propiedad / Asesoría - Renâv");
        const calLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${fmtDate(start)}/${fmtDate(end)}`;

        const fechaLocal = start.toLocaleString('es-MX', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long', 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });

        const mensaje = `Hola ${lead.contacto.nombre.split(' ')[0]},\n\nTe confirmamos tu cita programada.\n📅 *Fecha y hora:* ${fechaLocal}\n\n👉 Para mayor comodidad, puedes añadirla automáticamente a tu Calendario haciendo clic en el siguiente enlace:\n${calLink}\n\n¡Nos vemos pronto!`;

        await this.whatsappSender.sendMessage(lead.contacto.telefono, mensaje);
    }

    // Obtiene todo el historial de actividades de un lead en específico
    async findAllByLead(leadId: number): Promise<CrmActividad[]> {
        return this.prisma.crmActividad.findMany({
            where: { id_lead: leadId, activo: true },
            orderBy: { creada_en: 'desc' },
            include: { usuario: true },
        });
    }

    // Obtiene todas las actividades, con opción de filtrar por un lead
    async findAll(leadId?: number): Promise<CrmActividad[]> {
        const where: any = leadId ? { id_lead: leadId } : {};
        where.activo = true;
        return this.prisma.crmActividad.findMany({
            where,
            orderBy: { creada_en: 'desc' },
            include: { lead: { include: { contacto: true } }, usuario: true },
        });
    }

    // Busca una actividad específica por su ID
    async findOne(id: number): Promise<CrmActividad> {
        const activity = await this.prisma.crmActividad.findUnique({
            where: { id_actividad: id },
        });

        if (!activity || !activity.activo) {
            throw new NotFoundException(`Activity with ID ${id} not found`);
        }

        return activity;
    }

    // Actualiza la información de una actividad (por ejemplo: re-agendar o marcar completada)
    async update(id: number, updateActivityDto: UpdateActivityDto): Promise<CrmActividad> {
        try {
            const current = await this.findOne(id);
            const act = await this.prisma.crmActividad.update({
                where: { id_actividad: id },
                data: updateActivityDto,
            });

            // Si es CITA y acaba de ser programada o re-agendada
            if (act.tipo === 'CITA' && act.programada_para && (!current.programada_para || current.programada_para.getTime() !== act.programada_para.getTime())) {
                
                // Política de Cita Única: desactivar todo lo que no sea esta misma
                await this.prisma.crmActividad.updateMany({
                    where: { id_lead: act.id_lead, tipo: 'CITA', activo: true, id_actividad: { not: id } },
                    data: { activo: false }
                });

                this.sendCitaConfirmation(act.id_lead, act.programada_para, act.descripcion || undefined).catch(e => this.logger.error(e));
            }

            return act;
        } catch (error) {
            // @ts-ignore
            if (error.code === 'P2025') {
                throw new NotFoundException(`Activity with ID ${id} not found`);
            }
            throw error;
        }
    }

    // Elimina una actividad de la base de datos
    async remove(id: number): Promise<CrmActividad> {
        try {
            return await this.prisma.crmActividad.update({
                where: { id_actividad: id },
                data: { activo: false }
            });
        } catch (error) {
            // @ts-ignore
            if (error.code === 'P2025') {
                throw new NotFoundException(`Activity with ID ${id} not found`);
            }
            throw error;
        }
    }
}
