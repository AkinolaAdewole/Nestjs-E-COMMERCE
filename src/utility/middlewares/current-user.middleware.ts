import { Injectable, NestMiddleware, Req } from '@nestjs/common';
import { isArray } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private readonly usersService:UsersService){}
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization || req.headers.Authorization 
    // console.log(req);
    if(!authHeader || isArray(authHeader) || !authHeader.startsWith('Bearer ')){
        // req.CurrentUser = null;
        next()
    }else{
        const token = authHeader.split(' '[1] );
        // console.log(token);
        const {id} = verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
        const currentUser = await this.usersService.findOne(+id)
        next()   
    }
  }
}

interface JwtPayload{
    id:string;
}