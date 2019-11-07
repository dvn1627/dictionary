import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from './config/config.module';
import { UsersModule } from './users/users.module';
import { ConfigService } from './config/config.service';
import { AuthMiddleware } from './users/auth.middleware';
import { AuthService } from './users/auth.service';
import { WordsModule } from './words/words.module';

const config = new ConfigService('.env');
const databaseUrl = config.get('DB_URL') + ':' + config.get('DB_PORT') + '/' + config.get('DB_NAME');
console.log('CONNECTING TO DB=', databaseUrl);
@Module({
  imports: [MongooseModule.forRoot(databaseUrl), ConfigModule, UsersModule, WordsModule],
  providers: [AuthService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'api/words/', method: RequestMethod.ALL },
      );
  }
}
