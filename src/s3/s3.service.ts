import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3File } from '@prisma/client';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class S3Service {
    private s3Client: S3Client;

    constructor(private readonly configService: ConfigService, private readonly prismaService: PrismaService)  {
        this.init();
      }
    
      private init(): void {
        this.s3Client = new S3Client({
          region: this.configService.getOrThrow('AWS_S3_REGION'),
          endpoint: this.configService.getOrThrow('S3_Host'),
          forcePathStyle: true,
          credentials: {
            accessKeyId: this.configService.getOrThrow('AWS_ACCES_KEY_ID'),
            secretAccessKey: this.configService.getOrThrow('AWS_SECRET_KEY'),
          },
        });
      }

    async uploadFile(file: Express.Multer.File, tx?: Partial<PrismaService>): Promise<S3File>{

        const fileKey = randomUUID();
        const prismaService = tx || this.prismaService;

        try {
            await this.s3Client.send(
                new PutObjectCommand({
                    Bucket: this.configService.getOrThrow('AWS_BUCKET_NAME'),
                    Key: fileKey,
                    Body: file.buffer,
                }),
            );

            const createFile = await prismaService.s3File.create({
                data: {
                    s3Bucket: this.configService.getOrThrow('AWS_BUCKET_NAME'),
                    s3FileKey: fileKey,
                    mimeType: file.mimetype,
                    originalName: file.originalname,
                }
            })

            return createFile;
        } catch (error) {
            throw error;
        }

    
    }
}

