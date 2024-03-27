import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseService } from './database/database.service';
import { PrismaClient } from '@prisma/client';

@Module({
    imports: [AuthModule],
    controllers: [],
    providers: [PrismaClient],
})
export class AppModule {}
