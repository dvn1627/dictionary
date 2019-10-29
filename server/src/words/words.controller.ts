import { Controller, Get, Post, Body, Query, Put, Delete, Headers, Request, UseGuards} from '@nestjs/common';
import { CreateHeroDTO } from '../dto/create-hero.dto';
import { UpdateHeroDTO } from '../dto/update-hero.dto';
import { DeleteHeroDTO } from '../dto/delete-hero.dto';
import { ShowHeroDTO } from '../dto/show-hero.dto';

import { HeroesService } from './heroes.service';

//import { AuthGuard } from './auth.guard';

@Controller('api/heroes')
//@UseGuards(new AuthGuard())
export class HeroesController {
  constructor(private heroesService: HeroesService) {}

  @Get()
  async getHeroes() {
    return this.heroesService.get();
  }

  @Post()
  async createHero(@Body() createHeroDTO: CreateHeroDTO) {
    return this.heroesService.create(createHeroDTO);
  }

  @Put()
  async updateHero(@Body() updateHeroDTO: UpdateHeroDTO) {
    return this.heroesService.update(updateHeroDTO);
  }

  @Delete()
  async deleteHero(@Body() deleteHeroDTO: DeleteHeroDTO) {
    return this.heroesService.delete(deleteHeroDTO);
  }

  @Get('show')
  async show(@Query() showHeroDTO: ShowHeroDTO) {
    return this.heroesService.show(showHeroDTO);
  }
}