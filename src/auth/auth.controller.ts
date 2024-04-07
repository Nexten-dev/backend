import { Controller, Get, Post, Body, Req, UsePipes, ValidationPipe, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as expressUserAgent from 'express-useragent';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'регистрация' })
    @UsePipes(new ValidationPipe())
    @Post('register')
    async register(@Body() dto: RegisterDto) {
        const user = await this.authService.register(dto);
        if (!user) {
            throw new BadRequestException(`Не получается зарегистрировать пользователя ${JSON.stringify(dto)}`);
        }
        return;
    }

    @ApiOperation({ summary: 'авторизация' })
    @UsePipes(new ValidationPipe())
    @Post('login')
    async login(@Body() dto: LoginDto, @Req() req: Request) {
        const userAgent = expressUserAgent.parse(req.headers['user-agent']).source;
        const tokens = await this.authService.login(dto, userAgent);
        if (!tokens) {
            throw new BadRequestException(`Не получается авторизовать пользователя ${JSON.stringify(dto)}`);
        }
        return;
    }

    @Get('refrech')
    refrechTokens() {}
}
