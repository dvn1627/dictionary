import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WordClass } from '../schemas/word.class';

import { ConfigService } from '../config/config.service';
import { CreateWordDTO } from './dto/create-word.dto';
import { DeleteWordDTO } from './dto/delete-word.dto';
import { StatisticWordDTO } from './dto/statistic-word.dto';

@Injectable()
export class WordsService {

  constructor(private config: ConfigService, @InjectModel('Word') private readonly wordModel: Model<WordClass>,) {
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

  async delete(deleteWordDTO: DeleteWordDTO) {
    const word = await this.wordModel.findById(deleteWordDTO._id);
    await word.delete();
    return {
      message: 'word deleted',
      data: { word }
    }
  }

  async setStatistic(statisticWordDTO: StatisticWordDTO) {
    const word = await this.wordModel.findById(statisticWordDTO._id);
    word.showed++;
    if (statisticWordDTO.result) {
      word.correct++;
    } else {
      word.wrong++;
    }
    await word.save();
    return {
      message: 'word deleted',
      data: { word }
    }
  }

  async lean() {
    const words:Array<WordClass> = await this.wordModel.find().sort({ showed: 'asc'}).limit(10);
    return {
      data: words,
    };
  }
}
