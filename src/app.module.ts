import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { SearchCardModule } from './search-card/search-card.module';
// import { FileController } from './streaming-file/streaming-file.controller';

@Module({
  imports: [PrismaModule, SearchCardModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
