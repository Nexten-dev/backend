import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaClient } from '@prisma/client';

@Module({
    imports: [AuthModule],
    controllers: [],
    providers: [PrismaClient],
})
export class AppModule {}
