import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { YuGiOhCard } from '@prisma/client';
import { S3Service } from 'src/s3/s3.service';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class SearchCardService {
  constructor(
    private prismaService: PrismaService,
    private s3Service: S3Service,
  ) {}

  async createCard(
    data: CreateCardDto,
    file: Express.Multer.File,
  ): Promise<CreateCardDto> {
    try {
      await this.prismaService.$transaction(
        async (tx: Partial<PrismaService>): Promise<void> => {
          const s3File = await this.s3Service.uploadFile(file, tx);

          await tx.yuGiOhCard.create({
            data: {
              name: data.name,
              desc: data.desc,
              level: parseInt(data.level.toString()),
              atk: parseInt(data.atk.toString()),
              def: parseInt(data.def.toString()),
              extraDeck: data.extraDeck,
              cardType: data.cardType,
              s3File: {
                connect: {
                  id: s3File.id,
                },
              },
            },
          });
        },
      );
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
