import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserServices } from './users.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserServices) {}

    @ApiOperation({ summary: 'получить всех пользователей' })
    @Get()
    async getAllUser() {
        return await this.userService.getAll();
    }

    @ApiOperation({ summary: 'найти пользователя по id' })
    @Get(':id')
    async getUser(@Param('id', new ParseIntPipe()) id: number) {
        return this.userService.findUserById(id);
    }

    @ApiOperation({ summary: 'создать пользователя' })
    @Post()
    async create(@Body() dto: UserDto) {
        return this.userService.create(dto);
    }

    // @Put()
    // async update(@Body() dto) {
    //     return
    // }

    @ApiOperation({ summary: 'удалить пользователя' })
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.userService.delete(id);
    }
}
