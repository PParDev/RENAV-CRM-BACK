import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';
import * as bcrypt from 'bcrypt';

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
}
