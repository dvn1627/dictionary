import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// import { HeroesController } from './heroes.controller';
import { WordSchema } from '../schemas/word.schema';
import { AuthService } from '../users/auth.service';
import { ConfigModule } from '../config/config.module';
// import { HeroesService } from './heroes.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Word', collection: 'words', schema: WordSchema }]), ConfigModule],
  //controllers: [HeroesController],
  //providers: [AuthService, HeroesService]
})
export class WordsModule {}
