import { IsEmail, IsString, MinLength, Validate } from 'class-validator';
import { IsPassportMatchingConstraint } from '../../decorators/is-password-matching';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty()
    @IsString()
    fullname: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    @Validate(IsPassportMatchingConstraint)
    passwordRepeat: string;
}
