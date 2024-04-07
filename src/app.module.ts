import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaClient } from '@prisma/client';
import { UserModel } from './users/users.module';

@Module({
    imports: [AuthModule, UserModel],
    controllers: [],
    providers: [PrismaClient],
})
export class AppModule {}
