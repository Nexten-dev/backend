import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserServices } from './users.service';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserServices) {}

    @Get(':id')
    async getUser(@Param('id') id: string) {
        return this.userService.findUser(id);
    }

    @Post()
    async create(@Body() dto: RegisterDto) {
        return this.userService.create(dto);
    }

    // @Put()
    // async updateReminder(@Body() dto) {
    //     return this.userService.updateUser(dto);
    // }
    @Delete(':id')
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        return this.userService.delete(id);
    }
}
