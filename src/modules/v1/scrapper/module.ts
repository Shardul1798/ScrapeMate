
import { Module } from '@nestjs/common';
import { ScrapperController } from './controller';
import { ResponseHandler } from 'src/lib/response.handler';
import { scrapeService } from './service';
import { LoggerService } from 'src/lib/logger/logger.provider';

@Module({
  controllers: [ScrapperController],
  providers: [ResponseHandler, scrapeService, LoggerService]
})
export class WebScrapingModule {}