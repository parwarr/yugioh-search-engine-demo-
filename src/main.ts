import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      strictGroups: true,
      skipMissingProperties: false,
      forbidUnknownValues: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('YuGiOh')
    .setDescription('The YuGiOh API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);
  await app.listen(4000);
}
bootstrap();
