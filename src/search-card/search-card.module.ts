import { Module } from '@nestjs/common';
import { SearchCardService } from './search-card.service';
import { SearchCardController } from './search-card.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { S3Module } from 'src/s3/s3.module';
import { S3Service } from '../s3/s3.service';

@Module({
  imports: [PrismaModule, S3Module],
  controllers: [SearchCardController],
  providers: [SearchCardService, S3Service],
})
export class SearchCardModule {}
