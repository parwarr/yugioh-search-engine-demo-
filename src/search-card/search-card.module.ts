import { Module } from '@nestjs/common';
import { SearchCardService } from './search-card.service';
import { SearchCardController } from './search-card.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SearchCardController],
  providers: [SearchCardService],
})
export class SearchCardModule {}
