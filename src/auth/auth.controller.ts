<<<<<<< HEAD
import { Controller, Post, Body } from '@nestjs/common';
=======
import { Controller, Post, Body, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
>>>>>>> 5f80ce5b44d0a6fdf7b270a43651cae2ff38057e
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
<<<<<<< HEAD
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() body) {
    return this.authService.login(body);
  }
}
=======
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
>>>>>>> 5f80ce5b44d0a6fdf7b270a43651cae2ff38057e
