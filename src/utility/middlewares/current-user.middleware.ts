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
            req.currentUser = null;
            next();
            return;
            
        } else {
            try {
                 // Extract the token from the authorization header
            const token = authHeader.split(' ')[1];
            // Decode the JWT token and extract the user's id from it
            const { id } = <JwtPayload>verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);

            // Fetch the user associated with the extracted id from the UsersService
            const currentUser = await this.usersService.findOne(+id);
            req.currentUser = currentUser;
            // console.log(currentUser);
            // console.log(token);

              // Pass control to the next middleware in the chain
              next();
            } catch (error) {
                  // Pass control to the next middleware in the chain
            next();
            }
           
            
            

          
        }
    }
}

// Interface representing the structure of the payload stored in the JWT token
interface JwtPayload {
    id: string;
}


// declare global { ... }: This syntax is used in TypeScript to extend or modify global scope. 
// It's typically used when adding or modifying types globally.

// namespace Express { ... }: Here, we're defining a namespace Express. Namespaces are used to group related 
// code together.

// interface Request { ... }: Inside the Express namespace, we're extending the Request interface. 
// The Request interface represents the HTTP request in Express.

// currentUser?: UserEntity;: This line adds a new property currentUser to the Request interface. 
// The currentUser property is of type UserEntity or undefined. The ? makes the property optional, 
// meaning it doesn't have to be present in every Request object.

// currentUser?: UserEntity;: This defines a property named currentUser that can hold an instance of 
// the UserEntity type. The UserEntity likely represents data about the currently authenticated user.