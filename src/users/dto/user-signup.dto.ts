import { MinLength, isEmail, isNotEmpty, isString } from "class-validator";

export class UserSignUp{
    @isNotEmpty({message:'Name is Null'})
    @isString({message:'Name is string'})
    name: string;

    @isNotEmpty({message:'email is empty'})
    @isEmail({},{message:'Please, provide a valid email'})
    email:string;

    @isNotEmpty({message:'password is empty'})
    @MinLength(5,{message:'password minimum character should be 5'})
    password: string;
}