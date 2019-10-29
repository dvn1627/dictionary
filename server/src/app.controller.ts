import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('api')
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  getHello(): object {
    return {
      message : "hello -1"
    };
  }
}
