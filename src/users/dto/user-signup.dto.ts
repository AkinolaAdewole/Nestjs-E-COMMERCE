import { isEmail, isNotEmpty, isString } from "class-validator";

export class UserSignUp{
    @isNotEmpty({message:'Name is Null'})
    @isString({message:'Name is string'})
    name: string;

    @isNotEmpty({message:'Name is Null'})
    @isEmail({message:'Name is string'})
    email:string;
    password: string;
}