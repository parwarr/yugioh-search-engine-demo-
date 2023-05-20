import { Controller, Get, Param } from '@nestjs/common';
import { SearchCardService } from './search-card.service';
import { YuGiOhCard } from '@prisma/client';

@Controller('search-card')
export class SearchCardController {
  constructor(private readonly searchCardService: SearchCardService) {}

  @Get()
  async findAllCards() {
    return this.searchCardService.findAllCards();
  }

  @Get(':name')
  async findCardByName(@Param('name') name: YuGiOhCard['name']) {
    return this.searchCardService.findCardByName(name);
  }
}
