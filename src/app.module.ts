import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaClient } from '@prisma/client';
import { UserModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [AuthModule, UserModule, ConfigModule],
    providers: [PrismaClient],
})
export class AppModule {}
