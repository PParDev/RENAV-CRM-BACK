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
        const { password, servicios, ...rest } = createUserDto;

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
                bio: rest.bio,
                perfil_completo: false,
                password_hash,
            },
        });

        // Asignar servicios si se especificaron
        if (servicios && servicios.length > 0) {
            await this.syncServicios(user.id_usuario, servicios);
        }

        return this.excludePassword(user);
    }

    // Obtiene todos los usuarios, con opción a filtrar por rol
    async findAll(role?: Role): Promise<UserWithoutPassword[]> {
        const users = await this.prisma.crmUsuario.findMany({
            where: role ? { rol: role, activo: true } : { activo: true },
            include: { usuario_servicios: { include: { servicio: true } } },
        });
        return users.map((user) => this.excludePassword(user as any));
    }

    // Busca un solo usuario por su ID
    async findOne(id: string): Promise<UserWithoutPassword> {
        const user = await this.prisma.crmUsuario.findUnique({
            where: { id_usuario: +id },
            include: { usuario_servicios: { include: { servicio: true } } },
        });

        if (!user || (!user.activo)) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return this.excludePassword(user as any);
    }

    // Busca un usuario por su correo electrónico
    async findByEmail(email: string): Promise<CrmUsuario | null> {
        return this.prisma.crmUsuario.findUnique({
            where: { email },
        }).then(user => user?.activo ? user : null);
    }

    // Actualiza la información de un usuario existente
    async update(id: string, updateUserDto: UpdateUserDto): Promise<UserWithoutPassword> {
        const { password, nombre, role, email, telefono, activo, whatsapp, facebook, instagram, bio, perfil_completo, servicios } = updateUserDto;

        const updateData: any = {};
        if (nombre) updateData.nombre = nombre;
        if (role) updateData.rol = role;
        if (email) updateData.email = email;
        if (telefono !== undefined) updateData.telefono = telefono;
        if (activo !== undefined) updateData.activo = activo;
        if (whatsapp !== undefined) updateData.whatsapp = whatsapp;
        if (facebook !== undefined) updateData.facebook = facebook;
        if (instagram !== undefined) updateData.instagram = instagram;
        if (bio !== undefined) updateData.bio = bio;
        if (perfil_completo !== undefined) updateData.perfil_completo = perfil_completo;

        if (password) {
            const salt = await bcrypt.genSalt();
            updateData.password_hash = await bcrypt.hash(password, salt);
        }

        try {
            const user = await this.prisma.crmUsuario.update({
                where: { id_usuario: +id },
                data: updateData,
            });

            // Actualizar servicios si se especificaron
            if (servicios !== undefined) {
                await this.syncServicios(+id, servicios);
            }

            return this.excludePassword(user);
        } catch (error) {
            // @ts-ignore
            if (error.code === 'P2025') {
                throw new NotFoundException(`User with ID ${id} not found`);
            }
            throw new InternalServerErrorException('Error updating user');
        }
    }

    // Completa el perfil del agente (wizard) — guarda bio + servicios y marca perfil_completo=true
    async completarPerfil(id: string, data: { bio?: string; servicios: number[] }): Promise<UserWithoutPassword> {
        const user = await this.prisma.crmUsuario.update({
            where: { id_usuario: +id },
            data: {
                bio: data.bio,
                perfil_completo: true,
            },
        });

        await this.syncServicios(+id, data.servicios);
        return this.excludePassword(user);
    }

    // Sincroniza los servicios capacitados de un agente (borra los existentes y crea los nuevos)
    async syncServicios(id_usuario: number, servicioIds: number[]): Promise<void> {
        await this.prisma.crmUsuarioServicio.deleteMany({ where: { id_usuario } });
        if (servicioIds.length > 0) {
            await this.prisma.crmUsuarioServicio.createMany({
                data: servicioIds.map(id_servicio => ({ id_usuario, id_servicio })),
                skipDuplicates: true,
            });
        }
    }

    // Obtiene los servicios capacitados de un agente
    async getServicios(id: string): Promise<any[]> {
        const registros = await this.prisma.crmUsuarioServicio.findMany({
            where: { id_usuario: +id },
            include: { servicio: true },
        });
        return registros.map(r => r.servicio);
    }

    // Reasigna todos los leads activos de un agente al agente con menos carga capacitado
    async reasignarLeadsDeAgente(id_agente: number): Promise<{ leads_reasignados: number }> {
        const leadsActivos = await this.prisma.crmLead.findMany({
            where: {
                id_usuario_asignado: id_agente,
                activo: true,
                estado: { notIn: ['CERRADO', 'DESCARTADO', 'PERDIDO'] },
            },
            select: { id_lead: true, id_servicio_principal: true },
        });

        if (leadsActivos.length === 0) return { leads_reasignados: 0 };

        // Agentes activos excluyendo al que se va a desactivar
        const agentesDisponibles = await this.prisma.crmUsuario.findMany({
            where: { activo: true, id_usuario: { not: id_agente } },
            select: { id_usuario: true, usuario_servicios: { select: { id_servicio: true } } },
        });

        if (agentesDisponibles.length === 0) {
            // No hay nadie a quien reasignar, dejamos sin asignar
            await this.prisma.crmLead.updateMany({
                where: { id_usuario_asignado: id_agente, activo: true },
                data: { id_usuario_asignado: null },
            });
            return { leads_reasignados: leadsActivos.length };
        }

        // Contar leads activos de cada agente disponible
        const ids = agentesDisponibles.map(a => a.id_usuario);
        const counts = await this.prisma.crmLead.groupBy({
            by: ['id_usuario_asignado'],
            where: {
                id_usuario_asignado: { in: ids },
                activo: true,
                estado: { notIn: ['CERRADO', 'DESCARTADO', 'PERDIDO'] },
            },
            _count: { id_lead: true },
        });

        const countMap = new Map<number, number>(ids.map(id => [id, 0]));
        for (const row of counts) {
            if (row.id_usuario_asignado !== null) {
                countMap.set(row.id_usuario_asignado, row._count.id_lead);
            }
        }

        let reasignados = 0;
        for (const lead of leadsActivos) {
            // Preferir agentes capacitados en el servicio del lead
            const capacitados = lead.id_servicio_principal
                ? agentesDisponibles.filter(a => a.usuario_servicios.some(s => s.id_servicio === lead.id_servicio_principal))
                : [];

            const candidatos = capacitados.length > 0 ? capacitados : agentesDisponibles;

            // El de menor carga entre los candidatos
            let minCount = Infinity;
            let elegido: number | null = null;
            for (const agente of candidatos) {
                const c = countMap.get(agente.id_usuario) ?? 0;
                if (c < minCount) {
                    minCount = c;
                    elegido = agente.id_usuario;
                }
            }

            if (elegido !== null) {
                await this.prisma.crmLead.update({
                    where: { id_lead: lead.id_lead },
                    data: { id_usuario_asignado: elegido },
                });
                countMap.set(elegido, (countMap.get(elegido) ?? 0) + 1);
                reasignados++;
            }
        }

        return { leads_reasignados: reasignados };
    }

    // Elimina un usuario de la base de datos (desactiva y reasigna sus leads)
    async remove(id: string): Promise<UserWithoutPassword & { leads_reasignados: number }> {
        const id_agente = +id;

        // 1. Reasignar leads antes de desactivar
        const { leads_reasignados } = await this.reasignarLeadsDeAgente(id_agente);

        try {
            const user = await this.prisma.crmUsuario.update({
                where: { id_usuario: id_agente },
                data: { activo: false },
            });
            return { ...this.excludePassword(user), leads_reasignados };
        } catch (error) {
            // @ts-ignore
            if (error.code === 'P2025') {
                throw new NotFoundException(`User with ID ${id} not found`);
            }
            throw new InternalServerErrorException('Error deleting user');
        }
    }
}
