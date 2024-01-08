import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebScrapingModule } from './modules/v1/scrapper/module';
import { ResponseHandler } from './lib/response.handler';
import { LoggerModule } from './lib/logger/logger.module';

@Module({
  imports: [WebScrapingModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService, ResponseHandler],
})

export class AppModule {}
