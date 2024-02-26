import { IsNotEmpty, IsString, IsEmail, MinLength } from "class-validator";

export class UserSignUpDto {
    @IsNotEmpty({ message: 'Firstname is empty' })
    @IsString({ message: 'Firstame is string' })
    firstname: string;

    @IsNotEmpty({ message: 'Lastame is empty' })
    @IsString({ message: 'Lastname is string' })
    lastname: string;

    @IsNotEmpty({ message: 'email is empty' })
    @IsEmail({}, { message: 'Please, provide a valid email' })
    email: string;

    @IsNotEmpty({ message: 'password is empty' })
    @MinLength(5, { message: 'password minimum character should be 5' })
    password: string;
}
