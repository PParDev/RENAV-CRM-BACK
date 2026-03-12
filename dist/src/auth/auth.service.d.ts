import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    private codigos;
    enviarCodigo(email: string): Promise<{
        message: string;
    }>;
    resetPassword(data: any): Promise<{
        message: string;
    }>;
}
