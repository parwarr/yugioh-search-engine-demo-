import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { YuGiOhCard, YuGiOhCardImage } from '@prisma/client';

@Injectable()
export class SearchCardService {
  constructor(private prisma: PrismaService) {}

  async findAllCards(query?: string): Promise<YuGiOhCard[]> {
    return this.prisma.yuGiOhCard.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      include: {
        YuGiOhCardImage: true,
      },
    });
  }

  async findCardByName(name: YuGiOhCard['name']): Promise<YuGiOhCard> {
    return this.prisma.yuGiOhCard.findUnique({
      where: {
        name,
      },
      include: {
        YuGiOhCardImage: true,
      },
    });
  }

  async getCardByNameId(
    cardNameId: YuGiOhCardImage['cardNameId'],
    imageUrl: YuGiOhCardImage['imageUrl'],
  ) {
    return this.prisma.yuGiOhCardImage.findFirst({
      where: {
        cardNameId: cardNameId,
        AND: {
          imageUrl: imageUrl,
        },
      },
    });
  }

  async returnCardInfo(
    cardName: YuGiOhCard['name'],
    imageUrl: YuGiOhCardImage['imageUrl'],
  ): Promise<YuGiOhCard> {
    const name = await this.findCardByName(cardName);

    if (name) {
      return this.prisma.yuGiOhCard.findFirst({
        include: {
          YuGiOhCardImage: true,
        },
        where: {
          name: cardName,
          YuGiOhCardImage: {
            some: {
              imageUrl,
            },
          },
        },
      });
    }

    return null;
  }
}
