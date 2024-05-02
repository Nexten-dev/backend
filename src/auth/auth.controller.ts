import {
    Controller,
    Get,
    Post,
    Body,
    Req,
    Res,
    UsePipes,
    ValidationPipe,
    BadRequestException,
    UnauthorizedException,
    HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';
import { Token } from './interfaces';
import { ConfigService } from '@nestjs/config';
import { Cookie } from '../decorators/cookie.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {}

    @ApiOperation({ summary: 'регистрация' })
    @UsePipes(new ValidationPipe())
    @Post('registration')
    async register(@Body() dto: RegisterDto) {
        const user = await this.authService.register(dto);
        if (!user) {
            throw new BadRequestException(`Не получается зарегистрировать пользователя ${JSON.stringify(dto)}`);
        }
        return user;
    }

    @ApiOperation({ summary: 'авторизация' })
    @UsePipes(new ValidationPipe())
    @Post('login')
    async login(@Body() dto: LoginDto, @Req() req: Request, @Res() res: Response) {
        const agent = req.headers['user-agent'];
        const tokens = await this.authService.login(dto, agent);
        if (!tokens) {
            throw new BadRequestException(`Не получается авторизовать пользователя ${JSON.stringify(dto)}`);
        }
        this.setRefreshTokenToCookies(tokens, res);
        return tokens;
    }

    @Get('refresh')
    async refreshTokens(@Cookie('refreshtoken') refreshToken: string, req: Request, @Res() res: Response) {
        if (!refreshToken) {
            throw new UnauthorizedException();
        }
        const agent = req.headers['user-agent'];
        const tokens = await this.authService.refreshTokens(refreshToken, agent);

        return tokens;
    }

    private setRefreshTokenToCookies(tokens: Token, res: Response) {
        if (!tokens) {
            throw new UnauthorizedException();
        }

        res.cookie('refreshtoken', tokens.refreshToken.token, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(tokens.refreshToken.exp),
            secure: this.configService.get('NODE_ENV') === 'production',
            path: '/',
        });
        res.status(HttpStatus.CREATED).json(tokens);
    }
}
