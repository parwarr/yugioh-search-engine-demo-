import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { YuGiOhCard } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { S3Service } from 'src/s3/s3.service';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class SearchCardService {
  constructor(private prismaService: PrismaService,
    private readonly configService: ConfigService,
    private s3Service: S3Service) {}


async createCard(data: CreateCardDto, file: Express.Multer.File): Promise<CreateCardDto> {
  try {
    await this.prismaService.$transaction(
      async (tx: Partial<PrismaService>): Promise<void> => {
        const s3File = await this.s3Service.uploadFile(file, tx);

        await tx.yuGiOhCard.create({
          data: {
            ...data,
            s3File: {
              connect: {
                id: s3File.id,
              }
            }
          }
        });
      }
    )
    return;
  } catch (error) {
    
  }
}


  async findAllCards(): Promise<YuGiOhCard[]> {
    return this.prismaService.yuGiOhCard.findMany({
    });
  }

  async findCardByName(name: YuGiOhCard['name']): Promise<YuGiOhCard> {
    return this.prismaService.yuGiOhCard.findUnique({
      where: {
        name,
      },
  
    });
  }
  
}
