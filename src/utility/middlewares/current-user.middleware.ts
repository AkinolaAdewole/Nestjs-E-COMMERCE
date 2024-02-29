import { Injectable, NestMiddleware, Req } from '@nestjs/common';
import { isArray } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization || req.headers.Authorization 
    // console.log(req);
    if(!authHeader || isArray(authHeader) || !authHeader.startsWith('Bearer'))
    next();
  }
}