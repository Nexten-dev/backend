import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { RoleEnum } from '../enum/role.enum';

export class UserDto {
    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsString()
    role: RoleEnum;
}
