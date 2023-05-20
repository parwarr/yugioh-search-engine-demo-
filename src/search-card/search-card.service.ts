import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { YuGiOhCard } from '@prisma/client';

@Injectable()
export class SearchCardService {
  constructor(private prisma: PrismaService) {}

  async findAllCards(): Promise<YuGiOhCard[]> {
    return this.prisma.yuGiOhCard.findMany();
  }

  async findCardByName(name: YuGiOhCard['name']): Promise<YuGiOhCard> {
    return this.prisma.yuGiOhCard.findUnique({
      where: {
        name: name,
      },
    });
  }
}
