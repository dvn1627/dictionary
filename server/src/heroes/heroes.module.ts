import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { HeroesController } from './heroes.controller';
import { HeroSchema } from '../schemas/hero.schema';
import { AuthService } from '../users/auth.service';
import { ConfigModule } from '../config/config.module';
import { HeroesService } from './heroes.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Hero', collection: 'heroes', schema: HeroSchema }]), ConfigModule],
  controllers: [HeroesController],
  providers: [AuthService, HeroesService]
})
export class HeroesModule {}
