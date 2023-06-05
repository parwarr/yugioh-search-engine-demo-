import { Controller, Get, Param, Res } from '@nestjs/common';
import { SearchCardService } from './search-card.service';
import { YuGiOhCard } from '@prisma/client';

import { Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';

@Controller('search-card')
export class SearchCardController {
  constructor(
    private readonly searchCardService: SearchCardService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  async findAllCards(query?): Promise<YuGiOhCard[]> {
    return this.searchCardService.findAllCards(query);
  }

  @Get('/:name')
  async findCardByName(
    @Param('name') name: YuGiOhCard['name'],
    @Res() res: Response,
  ) {
    const getCardByName = await this.searchCardService.findCardByName(name);
    const card = await this.prisma.yuGiOhCardImage.findFirst({
      where: { cardNameId: getCardByName.id },
    });
    if (!card) {
      return res.status(404).send('Card image not found');
    }

    res.sendFile(card.imageUrl);
  }
}
