import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { Microservices } from './helpers/microservices';
import { Swagger } from './helpers/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await Microservices.connectTo(app);
  await Swagger.initOn(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(process.env.PORT || 8000);
}

bootstrap();
