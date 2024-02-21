import { isNotEmpty, isString } from "class-validator";

export class UserSignUp{
    @isNotEmpty({message:'Name is Null'})
    @isString({message:'Name is string'})
    name: string;

    
    email:string;
    password: string;
}