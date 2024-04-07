import { RegisterDto } from 'src/auth/dto/register.dto';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'IsPassportMatchingConstraint', async: false })
export class IsPassportMatchingConstraint implements ValidatorConstraintInterface {
    validate(passwordRepeat: string, args: ValidationArguments) {
        const obj = args.object as RegisterDto;
        return obj.password === passwordRepeat;
    }
    defaultMessage(validationArguments?: ValidationArguments): string {
        return 'Пароли не совпадают';
    }
}
