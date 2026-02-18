import { PrismaService } from '../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, Role } from '@prisma/client';
export type UserWithoutPassword = Omit<User, 'passwordHash'>;
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private excludePassword;
    create(createUserDto: CreateUserDto): Promise<UserWithoutPassword>;
    findAll(role?: Role): Promise<UserWithoutPassword[]>;
    findOne(id: string): Promise<UserWithoutPassword>;
    findByEmail(email: string): Promise<User | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<UserWithoutPassword>;
    remove(id: string): Promise<UserWithoutPassword>;
}
