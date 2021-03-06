import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  
  constructor(private readonly auth: AuthService) {
    
  }

  async use(req: Request, res: Response, next: Function) {
    if (!req.headers.authorization) {
      return res.json(this.authFailed());
    }
    let token;
    try {
      token = await this.auth.verifyToken(req.headers.authorization);
      req['email'] = token.email;
      next();

    } catch(error) {
      return res.json(this.authFailed());
    }
  }

  authFailed() {
    return {
      error: 'not authorized'
    }
  }
}
