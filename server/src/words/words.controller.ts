import { Controller, Get, Post, Body, Query, Put, Delete, Headers, Request, UseGuards} from '@nestjs/common';
import { CreateWordDTO } from './dto/create-word.dto';
import { DeleteWordDTO } from './dto/delete-word.dto';
import { StatisticWordDTO } from './dto/statistic-word.dto'

import { WordsService } from './words.service';

// import { AuthGuard } from '../users/auth.guard';

@Controller('api/words')
// @UseGuards(new AuthGuard())
export class WordsController {
  constructor(private wordsService: WordsService) {}

  @Get()
  async getWords() {
    return this.wordsService.all();
  }

  @Get('lean')
  async lean() {
    return this.wordsService.lean();
  }

  @Post()
  async createWord(@Body() createWordDTO: CreateWordDTO) {
    return this.wordsService.create(createWordDTO);
  }

  @Delete()
  async deleteWords(@Body() deleteWordDTO:DeleteWordDTO)  {
    return this.wordsService.delete(deleteWordDTO);
  }

  @Put()
  async setStatistic(@Body() setStatisticDTO: StatisticWordDTO) {
    return this.wordsService.setStatistic(setStatisticDTO);
  }
}
