import { Module } from '@nestjs/common';
import { SearchCardService } from './search-card.service';
import { SearchCardController } from './search-card.controller';

@Module({
  controllers: [SearchCardController],
  providers: [SearchCardService]
})
export class SearchCardModule {}
