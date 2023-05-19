import { Test, TestingModule } from '@nestjs/testing';
import { SearchCardController } from './search-card.controller';
import { SearchCardService } from './search-card.service';

describe('SearchCardController', () => {
  let controller: SearchCardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchCardController],
      providers: [SearchCardService],
    }).compile();

    controller = module.get<SearchCardController>(SearchCardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
