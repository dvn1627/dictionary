import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HeroClass } from '../schemas/hero.class';

import { ConfigService } from '../config/config.service';
import { CreateHeroDTO } from '../dto/create-hero.dto';
import { UpdateHeroDTO } from '../dto/update-hero.dto';
import { DeleteHeroDTO } from '../dto/delete-hero.dto';
import { ShowHeroDTO } from '../dto/show-hero.dto';

@Injectable()
export class HeroesService {

  constructor(private config: ConfigService, @InjectModel('Hero') private readonly heroModel: Model<HeroClass>,) {
  }

  async get() {
    const heroes:Array<HeroClass> = await this.heroModel.find();
    return {
      data: heroes,
    };
  }

  async create(createHeroDTO: CreateHeroDTO) {
    const hero = new this.heroModel(createHeroDTO);
    await hero.save();
    return {
      message: 'hero created',
      data: { hero }
    }
  }

  async update(updateHeroDTO: UpdateHeroDTO) {
    const hero = await this.heroModel.findById(updateHeroDTO.id);
    hero.name = updateHeroDTO.name;
    await hero.save();
    return {
      message: 'hero updated',
      data: { hero }
    };
  }

  async delete(deleteHeroDTO: DeleteHeroDTO) {
    const hero = await this.heroModel.findById(deleteHeroDTO.id);
    await hero.remove();
    return {
      message: 'hero deleted',
      data: { hero }
    };
  }

  async show(showHeroDTO: ShowHeroDTO) {
    return await this.heroModel.findById(showHeroDTO.id);
  }
}
