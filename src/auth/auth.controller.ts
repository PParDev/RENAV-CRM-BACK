import { Controller, Post, Body, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(
        @Body('email') email?: string,
        @Body('password') password?: string
    ) {
        if (!email || !password) {
            throw new UnauthorizedException('Correo y contraseña son requeridos');
        }

        const user = await this.authService.validateUser(email, password);
        return this.authService.login(user);
    }
}
