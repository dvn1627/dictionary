import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WordClass } from '../schemas/word.class';

import { ConfigService } from '../config/config.service';
import { CreateWordDTO } from './dto/create-word.dto';

@Injectable()
export class WordsService {

  constructor(private config: ConfigService, @InjectModel('Hero') private readonly wordModel: Model<WordClass>,) {
  }

  async all() {
    const words:Array<WordClass> = await this.wordModel.find();
    return {
      data: words,
    };
  }

  async create(createWordDTO: CreateWordDTO) {
    const word = new this.wordModel(createWordDTO);
    await word.save();
    return {
      message: 'word created',
      data: { word }
    }
  }
}
