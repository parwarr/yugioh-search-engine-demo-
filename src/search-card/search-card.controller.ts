import { Controller } from '@nestjs/common';
import { SearchCardService } from './search-card.service';

@Controller('search-card')
export class SearchCardController {
  constructor(private readonly searchCardService: SearchCardService) {}
}
