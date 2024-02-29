import { Injectable, NestMiddleware, Req } from '@nestjs/common';
import { isArray } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';


declare global{
    namespace Express{
        interface Request{
            currentUser?:UserEntity
        }
    }
}
@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private readonly usersService: UsersService) { }
  
    // This method is invoked for each incoming HTTP request
    async use(req: Request, res: Response, next: NextFunction) {
        // Extract the authorization header from the incoming request
        const authHeader = req.headers.authorization || req.headers.Authorization;

        // Check if the authorization header is missing, is an array, or does not start with 'Bearer '
        if (!authHeader || isArray(authHeader) || !authHeader.startsWith('Bearer ')) {
            // If any of the conditions are met, proceed with the next middleware in the chain
            req.currentUser = null
            next();
        } else {
            // Extract the token from the authorization header
            const token = authHeader.split(' ')[1];

            // Decode the JWT token and extract the user's id from it
            const { id } = <JwtPayload>verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);

            // Fetch the user associated with the extracted id from the UsersService
            const currentUser = await this.usersService.findOne(+id);
            req.currentUser = currentUser
            console.log(currentUser);
            

            // Pass control to the next middleware in the chain
            next();
        }
    }
}

// Interface representing the structure of the payload stored in the JWT token
interface JwtPayload {
    id: string;
}
