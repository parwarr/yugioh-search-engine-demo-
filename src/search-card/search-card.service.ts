import { Injectable } from '@nestjs/common';
import { YuGiOhCard } from '@prisma/client';
import { S3Service } from 'src/s3/s3.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class SearchCardService {
  constructor(
    private prismaService: PrismaService,
    private s3Service: S3Service,
  ) {}

  async createCard(data: CreateCardDto): Promise<CreateCardDto> {
    try {
      await this.prismaService.yuGiOhCard.create({
        data: {
          name: data.name,
          desc: data.desc,
          atk: data.atk,
          def: data.def,
          extraDeck: data.extraDeck,
          monsterType: data.monsterType,
          monsterAttribute: data.monsterAttribute,
          level: data.level,
          cardType: data.cardType,
          s3File: {
            connect: {
              id: data.s3FileId,
            },
          },
        },
      });
      return data;
    } catch (error) {
      console.error('Error in transaction:', error);
      throw new Error('An error occurred during the transaction.');
    }
  }

  async findAllCards(): Promise<YuGiOhCard[]> {
    const cards = await this.prismaService.yuGiOhCard.findMany({
      include: {
        s3File: true,
      },
    });

    const cardsWithPresignedUrls = await Promise.all(
      cards.map(async (card) => {
        const cardImagePresignedUrl = await this.s3Service.getPresignedUrl({
          bucket: card.s3File.s3Bucket,
          fileKey: card.s3File.s3FileKey,
        });
        return {
          ...card,
          cardImagePresignedUrl,
        };
      }),
    );
    return cardsWithPresignedUrls;
  }

  async findCardByName(
    name: YuGiOhCard['name'],
  ): Promise<YuGiOhCard & { cardImagePresignedUrl?: string }> {
    const card = await this.prismaService.yuGiOhCard.findUnique({
      where: {
        name,
      },
      include: {
        s3File: true,
      },
    });

    const cardImagePresignedUrl = await this.s3Service.getPresignedUrl({
      bucket: card.s3File.s3Bucket,
      fileKey: card.s3File.s3FileKey,
    });

    return {
      ...card,
      cardImagePresignedUrl,
    };
  }
}
