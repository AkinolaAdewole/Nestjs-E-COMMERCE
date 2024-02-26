import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class UserSignInDto {
    @IsNotEmpty({ message: 'email is empty' })
    @IsEmail({}, { message: 'Please, provide a valid email' })
    email: string;

    @IsNotEmpty({ message: 'password is empty' })
    @MinLength(5, { message: 'password minimum character should be 5' })
    password: string;
}