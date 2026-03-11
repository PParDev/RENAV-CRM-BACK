import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
<<<<<<< HEAD

  login(body: any) {
    const { email, password } = body;

    // Simulación simple de login
    if (email === 'amir@empresa.com' && password === 'Holaa123') {
      return {
        access_token: 'token_de_prueba_123456'
      };
    }

    return {
      message: 'Credenciales inválidas'
    };
  }

}
=======
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
>>>>>>> 5f80ce5b44d0a6fdf7b270a43651cae2ff38057e
