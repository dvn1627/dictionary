import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SignUpController } from './signup.controller';
import { LoginController } from './login.controller';
import { UserSchema } from '../schemas/user.schema';
import { AuthService } from './auth.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', collection: 'users', schema: UserSchema }]), ConfigModule],
  controllers: [SignUpController, LoginController],
  providers: [AuthService]
})
export class UsersModule {}
