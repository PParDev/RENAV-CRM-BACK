import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Role, CrmUsuario } from '@prisma/client';

export type UserWithoutPassword = Omit<CrmUsuario, 'password_hash'>;

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    // Excluye el hash de la contraseña del objeto de usuario
    private excludePassword(user: CrmUsuario): UserWithoutPassword {
        const { password_hash, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    // Crea un nuevo usuario en la base de datos
    async create(createUserDto: CreateUserDto): Promise<UserWithoutPassword> {
        const { password, ...rest } = createUserDto;

        const existingUser = await this.prisma.crmUsuario.findUnique({
            where: { email: rest.email },
        });

        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        const salt = await bcrypt.genSalt();
        const password_hash = await bcrypt.hash(password, salt);

        const user = await this.prisma.crmUsuario.create({
            data: {
                nombre: rest.nombre,
                email: rest.email,
                rol: rest.role,
                telefono: rest.telefono,
                activo: rest.activo,
                whatsapp: rest.whatsapp,
                facebook: rest.facebook,
                instagram: rest.instagram,
                password_hash,
            },
        });

        return this.excludePassword(user);
    }

    // Obtiene todos los usuarios, con opción a filtrar por rol
    async findAll(role?: Role): Promise<UserWithoutPassword[]> {
        const users = await this.prisma.crmUsuario.findMany({
            where: role ? { rol: role, activo: true } : { activo: true },
        });
        return users.map((user) => this.excludePassword(user));
    }

    // Busca un solo usuario por su ID
    async findOne(id: string): Promise<UserWithoutPassword> {
        const user = await this.prisma.crmUsuario.findUnique({
            where: { id_usuario: +id },
        });

        if (!user || (!user.activo)) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return this.excludePassword(user);
    }

    // Busca un usuario por su correo electrónico
    async findByEmail(email: string): Promise<CrmUsuario | null> {
        return this.prisma.crmUsuario.findUnique({
            where: { email },
        }).then(user => user?.activo ? user : null);
    }

    // Actualiza la información de un usuario existente
    async update(id: string, updateUserDto: UpdateUserDto): Promise<UserWithoutPassword> {
        const { password, nombre, role, email, telefono, activo, whatsapp, facebook, instagram } = updateUserDto;

        const updateData: any = {};
        if (nombre) updateData.nombre = nombre;
        if (role) updateData.rol = role;
        if (email) updateData.email = email;
        if (telefono !== undefined) updateData.telefono = telefono;
        if (activo !== undefined) updateData.activo = activo;
        if (whatsapp !== undefined) updateData.whatsapp = whatsapp;
        if (facebook !== undefined) updateData.facebook = facebook;
        if (instagram !== undefined) updateData.instagram = instagram;

        if (password) {
            const salt = await bcrypt.genSalt();
            updateData.password_hash = await bcrypt.hash(password, salt);
        }

        try {
            const user = await this.prisma.crmUsuario.update({
                where: { id_usuario: +id },
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

    // Elimina un usuario de la base de datos
    async remove(id: string): Promise<UserWithoutPassword> {
        try {
            const user = await this.prisma.crmUsuario.update({
                where: { id_usuario: +id },
                data: { activo: false }
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
