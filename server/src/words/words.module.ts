import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WordsController } from './words.controller';
import { WordSchema } from '../schemas/word.schema';
import { AuthService } from '../users/auth.service';
import { ConfigModule } from '../config/config.module';
import { WordsService } from './words.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Word', collection: 'words', schema: WordSchema }]), ConfigModule],
  controllers: [WordsController],
  providers: [AuthService, WordsService]
})
export class WordsModule {}
