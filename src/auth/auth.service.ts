import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.crmUsuario.findUnique({
      where: { email },
    });

    // User no existe
    if (!user) {
      throw new UnauthorizedException('Correo no registrado, ponganse en contacto con el administrador');
    }

    // No tiene contraseña (puede ser nula), o la contraseña no coincide
    if (!user.password_hash || !(await bcrypt.compare(pass, user.password_hash))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Retornamos sin el passwordHash por seguridad
    const { password_hash, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id_usuario, role: user.rol };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private codigos: Record<string, { codigo: number; expiracion: Date }> = {};

  async enviarCodigo(email: string) {

    const codigo = Math.floor(100000 + Math.random() * 900000);

    // El código expira en 15 minutos
    const expiracion = new Date();
    expiracion.setMinutes(expiracion.getMinutes() + 15);

    this.codigos[email] = {
      codigo,
      expiracion,
    };

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'renavcrm@gmail.com', // El usuario debe cambiar esto en el archivo / su .env
        pass: 'bvvh pkwl qcui rpfg', // El usuario debe generar una App Password
      },
    });

    const info = await transporter.sendMail({
      from: '"RENAV CRM" <renavcrm@gmail.com>',
      to: email,
      subject: 'Código de recuperación',
      text: `Tu código de recuperación es: ${codigo}\n\nEste código expirará en 15 minutos.`,
    });

    console.log('Mensaje enviado: %s', info.messageId);

    return { message: 'Código enviado' };
  }

  async resetPassword(data: any) {

    const { email, codigo, nuevaPassword } = data;

    // 1. Validar que vengan los datos (Frontend de todos modos lo validará)
    if (!email || !codigo || !nuevaPassword) {
      throw new UnauthorizedException("Faltan datos requeridos (email, código o nueva contraseña)");
    }

    const record = this.codigos[email];

    // 2. Validar que exista un código generado para ese email
    if (!record) {
      throw new UnauthorizedException("No se ha solicitado un cambio de contraseña o el código ha expirado");
    }

    // 3. Validar si el código expiró
    if (new Date() > record.expiracion) {
      delete this.codigos[email];
      throw new UnauthorizedException("El código ha expirado, solicita uno nuevo.");
    }

    // 4. Validar que el código coincida
    if (record.codigo.toString() !== codigo.toString()) {
      throw new UnauthorizedException("Código incorrecto");
    }

    // Si todo es válido, actualizamos la contraseña
    const hashedPassword = await bcrypt.hash(nuevaPassword, 10);

    await this.prisma.crmUsuario.update({
      where: { email },
      data: {
        password_hash: hashedPassword
      }
    });

    delete this.codigos[email];

    return {
      message: "Contraseña actualizada correctamente"
    };
  }
}
