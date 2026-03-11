import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: any): {
        access_token: string;
        message?: undefined;
    } | {
        message: string;
        access_token?: undefined;
    };
}
