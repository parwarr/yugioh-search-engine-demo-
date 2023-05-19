import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { YuGiOhCard } from '@prisma/client';

@Injectable()
export class SearchCardService {
  constructor(private prisma: PrismaService) {}

  findAllCards(): Promise<YuGiOhCard[]> {
    return this.prisma.yuGiOhCard.findMany();
  }

  findCardByName(name: YuGiOhCard['name']): Promise<YuGiOhCard> {
    return this.prisma.yuGiOhCard.findUnique({
      where: {
        name: name,
      },
    });
  }
}
