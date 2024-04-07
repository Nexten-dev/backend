import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserController } from './users.controller';
import { UserServices } from './users.service';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [PrismaClient, UserServices],
})
export class UserModel {}
