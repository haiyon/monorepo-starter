import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);

  await app.listen(3000, () => {
    logger.log('Server is listening on: http://localhost:3000');
  });
}
bootstrap();
