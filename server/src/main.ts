import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ConfigService } from './config/config.service';
import { ValidationPipe } from '@nestjs/common';

const config = new ConfigService('.env');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(config.get('PORT'));
}
bootstrap();
