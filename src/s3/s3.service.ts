import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3File } from '@prisma/client';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service {
  private s3Client: S3Client;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {
    this.init();
  }

  private init(): void {
    this.s3Client = new S3Client({
      region: this.configService.getOrThrow('S3_REGION'),
      endpoint: this.configService.getOrThrow('S3_HOST'),
      forcePathStyle: true,
      credentials: {
        accessKeyId: this.configService.getOrThrow('S3_ACCESS_KEY'),
        secretAccessKey: this.configService.getOrThrow('S3_SHARED_SECRET'),
      },
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    tx?: Partial<PrismaService>,
  ): Promise<S3File> {
    const fileKey = randomUUID();
    const prismaService = tx || this.prismaService;

    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.configService.getOrThrow('S3_BUCKET'),
          Key: fileKey,
          Body: file.buffer,
        }),
      );

      const createFile = await prismaService.s3File.create({
        data: {
          s3Bucket: this.configService.getOrThrow('S3_BUCKET'),
          s3FileKey: fileKey,
          mimeType: file.mimetype,
          originalName: file.originalname,
        },
      });

      return createFile;
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred during file upload.');
    }
  }

  async getPresignedUrl({
    bucket,
    fileKey,
  }: {
    bucket: string;
    fileKey: string;
  }): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: bucket,
        Key: fileKey,
      });
      const signedUrl = await getSignedUrl(this.s3Client, command, {
        expiresIn: 3600,
      });

      return signedUrl;
    } catch (error) {
      throw error;
    }
  }
}
