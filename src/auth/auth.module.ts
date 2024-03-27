import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PrismaClient } from '@prisma/client';

@Module({
    imports: [DatabaseModule],
    controllers: [AuthController],
    providers: [AuthService, PrismaClient],
})
export class AuthModule {}
