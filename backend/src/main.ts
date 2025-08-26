import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use(cookieParser());
  const origin = process.env.CORS_ORIGIN || 'http://localhost:3000';
  app.enableCors({ origin, credentials: true });

  const port = process.env.PORT || 4000;
  await app.listen(port);

  console.log(`HTTP server on http://localhost:${port}`);
}
bootstrap();
