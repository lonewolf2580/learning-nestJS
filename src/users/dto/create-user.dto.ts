import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(['INTERN', 'MANAGER', 'ADMIN'], {
        message: 'Valid role required!',
    })
    role: 'INTERN' | 'MANAGER' | 'ADMIN';
}