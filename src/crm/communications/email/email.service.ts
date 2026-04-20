import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../database/prisma.service';
import * as nodemailer from 'nodemailer';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(EmailService.name);
  private readonly brandColor = '#0A1128';
  private readonly white = '#FFFFFF';
  private readonly gray = '#F9FAFB';

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    const smtpPort = Number(this.configService.get('SMTP_PORT'));
    const smtpHost = this.configService.get<string>('SMTP_HOST')?.trim();
    const smtpUser = this.configService.get<string>('SMTP_USER')?.trim();
    const smtpPass = this.configService.get<string>('SMTP_PASS')?.trim();

    this.transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      // Optimización de tiempo de espera
      connectionTimeout: 10000, 
      greetingTimeout: 10000,
    });

    // Verificar conexión al arrancar (en segundo plano para no bloquear)
    this.transporter.verify().then(() => {
      this.logger.log('Conexión SMTP verificada exitosamente');
    }).catch(err => {
      this.logger.error('Error de conexión SMTP al iniciar:', err.message);
    });
  }

  async sendEmail(sendEmailDto: SendEmailDto, attachments: Express.Multer.File[] = [], userId?: number) {
    // Defensive conversion in case DTO transformation is bypassed
    const id_lead = sendEmailDto.id_lead ? Number(sendEmailDto.id_lead) : undefined;
    const { to, to_name, subject, content } = sendEmailDto;

    let targetEmail = to;
    if (id_lead && !to) {
      const lead = await this.prisma.crmLead.findUnique({
        where: { id_lead },
        include: { contacto: true },
      });
      if (lead?.contacto?.correo) {
        targetEmail = lead.contacto.correo;
      }
    }

    if (!targetEmail) {
      throw new InternalServerErrorException('No se encontró destinatario para el correo');
    }

    try {
      // Final variable replacement (Backend Fallback)
      let finalSubject = subject;
      let nameForVar = to_name || 'Cliente';
      
      if (id_lead) {
        const lead = await this.prisma.crmLead.findUnique({ where: { id_lead }, include: { contacto: true } });
        if (lead?.contacto?.nombre) {
          nameForVar = lead.contacto.nombre;
        }
      }
      
      finalSubject = subject.replace(/{{nombre}}/g, nameForVar);
      const finalContent = content.replace(/{{nombre}}/g, nameForVar);
      const premiumHtml = this.wrapInPremiumLayout(finalSubject, finalContent);

      const info = await this.transporter.sendMail({
        from: this.configService.get<string>('SMTP_FROM'),
        to: targetEmail,
        subject: finalSubject,
        html: premiumHtml,
        attachments: attachments.map(file => ({
          filename: file.originalname,
          content: file.buffer,
          contentType: file.mimetype,
        })),
      });

      this.logger.log(`Email enviado a ${targetEmail}: ${info.messageId}`);

      // Log in CrmMensaje (Always save, even if no id_lead)
      await this.prisma.crmMensaje.create({
        data: {
          id_lead: id_lead ? Number(id_lead) : undefined,
          id_usuario: typeof userId === 'number' && !isNaN(userId) ? userId : undefined,
          es_entrante: false,
          canal: 'EMAIL',
          texto: content.replace(/<[^>]*>?/gm, '').substring(0, 500), 
          asunto: finalSubject,
          to_email: targetEmail,
          to_name: nameForVar,
          html_cuerpo: content,
          estatus_entrega: 'ENVIADO',
        },
      });

      return { success: true, messageId: info.messageId };
    } catch (error) {
      this.logger.error(`Error enviando email a ${targetEmail}`, error);
      throw new InternalServerErrorException('Error al enviar el correo: ' + error.message);
    }
  }

  private async replaceVariables(content: string, id_lead?: number): Promise<string> {
    if (!id_lead) return content;
    
    const lead = await this.prisma.crmLead.findUnique({
      where: { id_lead },
      include: { contacto: true },
    });

    const nombre = lead?.contacto?.nombre || 'Cliente';
    return content.replace(/{{nombre}}/g, nombre);
  }

  private wrapInPremiumLayout(subject: string, content: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f7f9; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #eef2f5; }
          .header { background-color: ${this.brandColor}; padding: 40px 20px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 900; letter-spacing: -0.5px; }
          .content { padding: 40px 30px; line-height: 1.6; color: #334155; font-size: 16px; }
          .footer { background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #f1f5f9; }
          .footer p { margin: 0; color: #94a3b8; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; }
          .logo { margin-bottom: 20px; font-size: 20px; font-weight: bold; color: white; display: inline-block; border-bottom: 2px solid #3b82f6; padding-bottom: 4px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">RENAV</div>
            <h1>${subject}</h1>
          </div>
          <div class="content">
            ${content}
          </div>
          <div class="footer">
            <p>Enviado desde RENAV Real Estate Group</p>
            <p style="margin-top: 8px; color: #cbd5e1;">&copy; 2026 Todos los derechos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  async getHistoryByLead(id_lead: number) {
    return this.prisma.crmMensaje.findMany({
      where: {
        id_lead,
        canal: 'EMAIL',
        activo: true,
      },
      orderBy: { creado_en: 'desc' },
    });
  }

  async getAllHistory() {
    return this.prisma.crmMensaje.findMany({
      where: {
        canal: 'EMAIL',
        activo: true,
      },
      include: {
        lead: {
          include: { contacto: true }
        },
        usuario: true
      },
      orderBy: { creado_en: 'desc' },
      take: 100
    });
  }

  async deleteMessage(id: number) {
    return this.prisma.crmMensaje.update({
      where: { id_mensaje: id },
      data: { activo: false }
    });
  }
}
