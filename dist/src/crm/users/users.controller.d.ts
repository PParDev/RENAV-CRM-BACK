import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '@prisma/client';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./users.service").UserWithoutPassword>;
    findAll(role?: Role): Promise<import("./users.service").UserWithoutPassword[]>;
    findOne(id: string): Promise<import("./users.service").UserWithoutPassword>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./users.service").UserWithoutPassword>;
    remove(id: string): Promise<import("./users.service").UserWithoutPassword>;
}
