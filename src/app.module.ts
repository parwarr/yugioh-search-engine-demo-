import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { HomepageModule } from './homepage/homepage.module';
import { SearchCardModule } from './search-card/search-card.module';

@Module({
  imports: [PrismaModule, HomepageModule, SearchCardModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
