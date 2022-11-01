import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = NestFactory.create(AppModule);
  const globalPrefix = 'api/v1';
  (await app).setGlobalPrefix(globalPrefix);
  await (await app).listen(process.env.PORT);
}
bootstrap();
