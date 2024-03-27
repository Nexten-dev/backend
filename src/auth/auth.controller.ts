import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async create(@Body() dto: AuthDto) {
        return await this.authService.create(dto);
    }

    @HttpCode(200)
    @Post('login')
    async login(@Body() dto: AuthDto) {}
}
