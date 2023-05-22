import { Controller, Get, Param, Res } from '@nestjs/common';
import { SearchCardService } from './search-card.service';
import { YuGiOhCard, YuGiOhCardImage } from '@prisma/client';
import { Response } from 'express';
import path from 'path';

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
    imageUrl: YuGiOhCardImage['imageUrl'],
    @Res() res: Response,
  ): Promise<YuGiOhCard> {
    const cardName = await this.searchCardService.findCardByName(name);
    if (cardName) {
      const cardInformation = await this.searchCardService.returnCardInfo(
        name,
        imageUrl,
      );
      if (cardInformation && cardInformation.YuGiOhCardImage.length > 0) {
        const absoluteImagePath = path.join(
          __dirname,
          '..',
          'public',
          cardInformation.YuGiOhCardImage[0].imageUrl,
        );
        return res.sendFile(absoluteImagePath);
      }
    }
  }
}
