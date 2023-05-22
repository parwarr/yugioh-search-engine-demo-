import { Controller, Get, Param, Res } from '@nestjs/common';
import { SearchCardService } from './search-card.service';
import { YuGiOhCard, YuGiOhCardImage } from '@prisma/client';
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
    imageUrl: YuGiOhCardImage['imageUrl'],
    @Res() res: Response,
  ): Promise<YuGiOhCard> {
    const cardName = await this.searchCardService.findCardByName(name);
    const cardImage = await this.searchCardService.getCardByNameId(
      cardId,
      imageUrl,
    );
    if (cardName) {
      // TODO - fix this
      const cardImg: any = res.send({
        name: name,
        imageUrl: cardImage,
      });

      const cardInformation = await this.searchCardService.returnCardInfo(
        name,
        cardInfo,
      );

      if (cardId === NameId) {
        console.log(cardInformation);
        return cardInformation && cardImg;
      }
    }
  }
}
