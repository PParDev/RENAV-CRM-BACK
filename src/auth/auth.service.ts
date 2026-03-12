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

     private codigos = {};

  async enviarCodigo(email: string) {

    const codigo = Math.floor(100000 + Math.random() * 900000);

    this.codigos[email] = codigo;

    const transporter = nodemailer.createTransport({
    //host: 'smtp.gmail.com',
    //port: 587,
    //secure: false,
    service: 'gmail',
    auth: {
        user: 'renavcrm@gmail.com',
        pass: 'bgyu dued pdpx dwhy',
    },
    });

    await transporter.sendMail({
      from: '"RENAV CRM" <renavcrm@gmail.com>',
      to: email,
      subject: 'Código de recuperación',
      text: `Tu código es: ${codigo}`,
    });

    return { message: 'Código enviado' };
  }

  async resetPassword(data: any) {

  const { email, codigo, nuevaPassword } = data;

  if (this.codigos[email] != codigo) {
    return { message: "Código incorrecto" };
  }

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
