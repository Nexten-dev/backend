import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon from 'argon2';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR, USER_DOUBLE_ERROR } from 'src/exceptions/exceptions.constants';
import { JwtService } from '@nestjs/jwt';
import { UserServices } from 'src/users/users.service';
import { PrismaClient } from '@prisma/client';
import { RegisterDto } from './dto/register.dto';
import { add } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { Token, User } from '@prisma/client';
import { LoginDto } from './dto/login.dto';
import * as UserAgent from 'user-agents';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserServices,
        private readonly authService: PrismaClient,
    ) {}

    async register(dto: RegisterDto) {
        const user = await this.userService.findUser(dto.email);
        if (user) {
            throw new UnauthorizedException(USER_DOUBLE_ERROR);
        }
        return this.userService.create(dto);
    }

    async login({ email, password }: LoginDto, userAgent) {
        const user = await this.userService.findUser(email);
        if (!user) {
            throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
        }
        const isCorrectPassword = await argon.verify(user.password, password);
        if (!isCorrectPassword) {
            throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
        }
        const accessToken = this.jwtService.sign({ id: user.id, email: user.email, roles: user.roles });
        const refrechToken = await this.getRefreshToken(user.id, userAgent);
        return { accessToken, refrechToken };
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
