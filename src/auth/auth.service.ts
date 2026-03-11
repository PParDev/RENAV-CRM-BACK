import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

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