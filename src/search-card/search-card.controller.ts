import { Controller, Get, Param } from '@nestjs/common';
import { SearchCardService } from './search-card.service';
import { YuGiOhCard } from '@prisma/client';

@Controller('search-card')
export class SearchCardController {
  constructor(private readonly searchCardService: SearchCardService) {}

  @Get()
  async findAllCards(query?): Promise<YuGiOhCard[]> {
    return this.searchCardService.findAllCards(query);
  }

  @Get('/:name')
  async findCardByName(
    @Param('name') name: YuGiOhCard['name'],
  ): Promise<YuGiOhCard> {
    return await this.searchCardService.findCardByName(name);
  }
}
