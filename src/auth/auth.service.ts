import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon from 'argon2';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR, USER_DOUBLE_ERROR } from 'src/exceptions/exceptions.constants';
import { JwtService } from '@nestjs/jwt';
import { UserServices } from 'src/users/users.service';
import { PrismaClient } from '@prisma/client';
import { RegisterDto } from './dto/register.dto';
import { add } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { Tokens } from './types/interface';
import { User, Token } from '@prisma/client';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserServices,
        private readonly authService: PrismaClient,
    ) {}

    async register(dto: RegisterDto) {
        const user = await this.userService.findUserByEmailOrId(dto.email);
        if (user) {
            throw new UnauthorizedException(USER_DOUBLE_ERROR);
        }
        delete dto.passwordRepeat;
        return this.userService.create(dto);
    }

    async refreshTokens(refreshToken: string, agent: string): Promise<Tokens> {
        const token = await this.authService.token.delete({ where: { token: refreshToken } });
        if (!token || new Date(token.exp) < new Date()) {
            throw new UnauthorizedException();
        }
        const user = await this.userService.findUserByEmailOrId(token.userId);
        return this.generateTokens(user, agent);
    }

    async login({ email, password }: LoginDto, userAgent: string) {
        const user = await this.userService.findUserByEmailOrId(email);
        if (!user) {
            throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
        }
        const isCorrectPassword = await argon.verify(user.password, password);
        if (!isCorrectPassword) {
            throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
        }
        return this.generateTokens(user, userAgent);
    }

    private async generateTokens(user: User, userAgent): Promise<Tokens> {
        const accessToken = this.jwtService.sign({ id: user.id, email: user.email, roles: user.roles });
        const refreshToken = await this.getRefreshToken(user.id, userAgent);
        return { accessToken, refreshToken };
    }

    async getRefreshToken(userId: string, userAgent): Promise<Token> {
        return this.authService.token.create({
            data: {
                token: uuidv4(),
                exp: add(new Date(), { months: 1 }),
                userId,
                userAgent: userAgent,
            },
        });
    }
}
