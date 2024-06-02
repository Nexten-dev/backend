import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserDto } from './dto/user.dto';
import * as argon from 'argon2';
import { RoleEnum } from './enum/role.enum';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class UserServices {
    constructor(private readonly userService: PrismaClient) {}

    async getAll() {
        return await this.userService.user.findMany();
    }

    async findUserById(id: number) {
        return this.userService.user.findFirst({ where: { id } });
    }

    async findUserByEmail(email: string) {
        return this.userService.user.findFirst({ where: { email } });
    }

    async create(dto: UserDto) {
        try {
            return await this.userService.user.create({
                data: {
                    fullname: dto.fullname,
                    email: dto.email,
                    password: await argon.hash(dto.password, { hashLength: 60 }),
                    roles: [RoleEnum.USER],
                },
            });
        } catch (err) {
            throw new BadRequestException(
                'Не удалось создать пользователя, возможно с такой почтой он уже существует, попробуйте дургую',
            );
        }
    }

    async delete(id: number) {
        return this.userService.user.delete({ where: { id } });
    }
}
