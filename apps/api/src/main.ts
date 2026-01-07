import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT ? Number(process.env.PORT) : 3333;
  const host = process.env.HOST ?? 'localhost';
  await app.listen(port, host);
  console.log(`API running on http://${host}:${port}`);
}

bootstrap();
