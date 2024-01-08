import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './lib/response.handler';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggingInterceptor } from './interceptors/logging/logging.interceptor';

async function bootstrap() {
  const app: INestApplication =
    await NestFactory.create<NestExpressApplication>(AppModule, {
      logger: ['error', 'warn', 'debug', 'log'],
    });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.enableCors();
  app.setGlobalPrefix('/api/v1');
  app.enableShutdownHooks();

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Web Scrape Mate')
    .setDescription('API for webscraping')
    .setVersion('1.0')
    .build();

  // app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  app.useLogger
  (app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform incoming data to the DTO types
      whitelist: true, // Remove any properties that do not have corresponding decorators
    }),
  );

  const PORT = process.env.port || 5001;
  await app.listen(PORT);
}
bootstrap();
