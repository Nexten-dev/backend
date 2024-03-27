import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthService {
    constructor(private readonly databaseService: DatabaseService) {}
    async create(dto: AuthDto) {
        console.log(dto);
        this.databaseService.user.create({
            data: {
                fullname: dto.fullname,
                email: dto.email,
                password: dto.password,
            },
        });
    }

    async findAll() {
        return `This action returns all auth`;
    }

    async findOne(id: number) {
        return `This action returns a #${id} auth`;
    }
}
