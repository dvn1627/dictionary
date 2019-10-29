import { Controller, Get, Post, Body, Query, Put, Delete, Headers, Request, UseGuards} from '@nestjs/common';
import { CreateWordDTO } from './dto/create-word.dto';

import { WordsService } from './words.service';

//import { AuthGuard } from './auth.guard';

@Controller('api/heroes')
//@UseGuards(new AuthGuard())
export class WordsController {
  constructor(private wordsService: WordsService) {}

  @Get()
  async getWords() {
    return this.wordsService.all();
  }

  @Post()
  async createWord(@Body() createWordDTO: CreateWordDTO) {
    return this.wordsService.create(createWordDTO);
  }
}
