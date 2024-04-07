import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaClient } from '@prisma/client';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTConfig } from 'src/configs/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/strategies/jwt.stratagy';
import { UserServices } from '../users/users.service';

@Module({
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule.forRoot({ isGlobal: true })],
            inject: [ConfigService],
            useFactory: getJWTConfig,
        }),
        PassportModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, PrismaClient, JwtStrategy, UserServices],
})
export class AuthModule {}
