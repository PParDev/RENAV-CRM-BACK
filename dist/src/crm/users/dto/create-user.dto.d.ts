import { Role } from '@prisma/client';
export declare class CreateUserDto {
    nombre: string;
    email: string;
    password: string;
    role: Role;
    telefono?: string;
    activo?: boolean;
}
