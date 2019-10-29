import { HeroesController } from './heroes.controller';
import { HeroesService } from './heroes.service';
import { Model } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HeroClass } from '../schemas/hero.class';
import DbModule from '../test/db-test.module';


describe('HeroesController', () => {
  let heroesController: HeroesController;
  let heroesService: HeroesService;

  beforeEach(() => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DbModule({
          name: (new Date().getTime() * Math.random()).toString(16), // <-- This is to have a "unique" name for the connection
        }),
        TypeOrmModule.forFeature([
          UserEntity,
        ]),
      ],
      providers: [
        HeroesService,
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);

    heroesService = new HeroesService(@InjectModel('Hero') heroModel: Model<HeroClass>);
    heroesController = new HeroesController(heroesService);
  });

  describe('getHeroes', () => {
    it('should return an array of heroes', async () => {
      const result = ['test'];
      jest.spyOn(heroesService, 'get').mockImplementation(() => result);

      expect(await heroesController.getHeroes()).toBe(result);
    });
  });
});