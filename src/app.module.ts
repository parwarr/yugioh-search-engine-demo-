import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { S3Module } from './s3/s3.module';
import { SearchCardModule } from './search-card/search-card.module';

@Module({
  imports: [
    PrismaModule,
    SearchCardModule,
    S3Module,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
