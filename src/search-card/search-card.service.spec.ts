import { Test, TestingModule } from '@nestjs/testing';
import { SearchCardService } from './search-card.service';

describe('SearchCardService', () => {
  let service: SearchCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchCardService],
    }).compile();

    service = module.get<SearchCardService>(SearchCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
