import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserDto } from './dto/user.dto';
import * as argon from 'argon2';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UserServices {
    constructor(private readonly userService: PrismaClient) {}
    async findUser(str: string) {
        return this.userService.user.findFirst({ where: { OR: [{ id: str }, { email: str }] } });
    }

    async create(dto: RegisterDto) {
        return await this.userService.user.create({
            data: {
                fullname: dto.fullname,
                email: dto.email,
                password: await argon.hash(dto.password, { hashLength: 60 }),
                roles: ['USER'],
            },
        });
    }
    async delete(id: string) {
        return this.userService.user.delete({ where: { id } });
    }
}
