
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    findAll(@Query('role') role?: Role) {
        return this.usersService.findAll(role);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Get(':id/servicios')
    getServicios(@Param('id') id: string) {
        return this.usersService.getServicios(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    // Endpoint del wizard: completa perfil con bio + servicios
    @Patch(':id/completar-perfil')
    completarPerfil(
        @Param('id') id: string,
        @Body() body: { bio?: string; servicios: number[] },
    ) {
        return this.usersService.completarPerfil(id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}
