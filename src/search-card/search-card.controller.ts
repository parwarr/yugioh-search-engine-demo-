import { Controller, Get, Param, Res } from '@nestjs/common';
import { SearchCardService } from './search-card.service';
import { Prisma, YuGiOhCard, YuGiOhCardImage } from '@prisma/client';
import { Response } from 'express';

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
    cardId: YuGiOhCard['id'],
    NameId: YuGiOhCardImage['cardNameId'],
    cardInfo: YuGiOhCard,
    imageUrl: YuGiOhCardImage['image'],
    @Res() res: Response,
  ): Promise<YuGiOhCard> {
    const cardName = this.searchCardService.findCardByName(name);
    if (cardName) {
      // TODO - fix this
      const cardImg: any = res.sendFile(
        `/Users/taapaha6/Documents/dev/Yu-Gi-Oh-searchEngine/search-engine/images/Blue_Eyes_White_Dragon.jpeg`,
      );
      const cardInformation = await this.searchCardService.returnCardInfo(
        name,
        cardInfo,
      );

      if (cardInformation) {
        console.log(cardInformation);
        return cardInformation && cardImg;
      }
    }
  }
}
