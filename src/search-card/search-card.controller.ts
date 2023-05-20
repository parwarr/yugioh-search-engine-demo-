import { Controller, Get, Param } from '@nestjs/common';
import { SearchCardService } from './search-card.service';
import { YuGiOhCard, YuGiOhCardImage } from '@prisma/client';

@Controller('search-card')
export class SearchCardController {
  constructor(private readonly searchCardService: SearchCardService) {}

  @Get()
  async findAllCards(): Promise<YuGiOhCard[]> {
    return this.searchCardService.findAllCards();
  }

  @Get(':name')
  async findCardByName(
    @Param('name') name: YuGiOhCard['name'],
    // image: YuGiOhCardImage['image'],
  ): Promise<YuGiOhCard> {
    return this.searchCardService.findCardByName(name);
  }
}
