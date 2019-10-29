import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeroesModule } from './heroes/heroes.module';
import { ConfigModule } from './config/config.module';
import { UsersModule } from './users/users.module';
import { ConfigService } from './config/config.service';
import { AuthMiddleware } from './users/auth.middleware';
import { AuthService } from './users/auth.service';

const config = new ConfigService('.env');
const databaseUrl = config.get('DB_URL') + ':' + config.get('DB_PORT') + '/' + config.get('DB_NAME');
console.log('CONNECTING TO DB=', databaseUrl);
@Module({
  imports: [MongooseModule.forRoot(databaseUrl), ConfigModule, HeroesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
//export class AppModule {}
// USE MIDDLEWARE
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'api/heroes/', method: RequestMethod.ALL });
  }
}
