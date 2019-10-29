import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UserClass } from '../schemas/user.class';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthService {

  constructor(private config: ConfigService) {}
  
  async createToken(user: UserClass) {
    const expiresIn = 60 * 60;
    const token = await jwt.sign({ email: user.email }, this.config.get('SECRET'), { expiresIn });
    return token;
  }

  async verifyToken(token: string) {
    return jwt.verify(token, this.config.get('SECRET'));
  }
}