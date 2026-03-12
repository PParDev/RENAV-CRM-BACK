import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    recuperar(body: any): Promise<{
        message: string;
    }>;
    reset(body: any): Promise<{
        message: string;
    }>;
    login(email?: string, password?: string): Promise<{
        access_token: string;
    }>;
}
