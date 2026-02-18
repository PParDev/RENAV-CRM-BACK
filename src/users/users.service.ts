
import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User, Role } from '@prisma/client';

export type UserWithoutPassword = Omit<User, 'passwordHash'>;

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    private excludePassword(user: User): UserWithoutPassword {
        const { passwordHash, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async create(createUserDto: CreateUserDto): Promise<UserWithoutPassword> {
        const { password, ...rest } = createUserDto;

        const existingUser = await this.prisma.user.findUnique({
            where: { email: rest.email },
        });

        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const user = await this.prisma.user.create({
            data: {
                ...rest,
                passwordHash,
            },
        });

        return this.excludePassword(user);
    }

    async findAll(role?: Role): Promise<UserWithoutPassword[]> {
        const users = await this.prisma.user.findMany({
            where: role ? { role } : undefined,
        });
        return users.map((user) => this.excludePassword(user));
    }

    async findOne(id: string): Promise<UserWithoutPassword> {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return this.excludePassword(user);
     }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<UserWithoutPassword> {
        const { password, ...rest } = updateUserDto;

        const updateData: any = { ...rest };

        if (password) {
            const salt = await bcrypt.genSalt();
            updateData.passwordHash = await bcrypt.hash(password, salt);
        }

        try {
            const user = await this.prisma.user.update({
                where: { id },
                data: updateData,
            });

            return this.excludePassword(user);
        } catch (error) {
            // @ts-ignore
            if (error.code === 'P2025') {
                throw new NotFoundException(`User with ID ${id} not found`);
            }
            throw new InternalServerErrorException('Error updating user');
        }
    }

    async remove(id: string): Promise<UserWithoutPassword> {
        try {
            const user = await this.prisma.user.delete({
                where: { id },
            });
            return this.excludePassword(user);
        } catch (error) {
            // @ts-ignore
            if (error.code === 'P2025') {
                throw new NotFoundException(`User with ID ${id} not found`);
            }
            throw new InternalServerErrorException('Error deleting user');
        }
    }
}
