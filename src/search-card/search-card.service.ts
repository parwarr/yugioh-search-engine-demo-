import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { YuGiOhCard, YuGiOhCardImage } from '@prisma/client';

@Injectable()
export class SearchCardService {
  constructor(private prisma: PrismaService) {}

  async findAllCards(): Promise<YuGiOhCard[]> {
    return this.prisma.yuGiOhCard.findMany({
      include: {
        YuGiOhCardImage: true,
      },
    });
  }

  async findCardByName(
    name: YuGiOhCard['name'],
    // image: YuGiOhCardImage['image'],
  ): Promise<YuGiOhCard> {
    return this.prisma.yuGiOhCard.findUnique({
      where: {
        name: name,
      },
      include: {
        YuGiOhCardImage: true,
      },
    });
  }
}
