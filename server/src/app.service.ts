import { Injectable } from '@nestjs/common';
import { ConfigService } from './config/config.service';

@Injectable()
export class AppService {

  constructor(private config: ConfigService) {
    console.log('CONFIG', this.config.get('SECRET'));
  }

  getHello(): string {
    return 'Hello World!';
  }
}
