import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { scrapperDto } from './dto';
import { Response } from 'express';
import puppeteer from 'puppeteer';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseHandler } from 'src/lib/response.handler';
import { HTTP_STATUS_CODE, MESSAGES, STATUS_MSG } from 'src/constants/constants';
import { scrapeService } from './service';
import { LoggerService } from 'src/lib/logger/logger.provider';

@Controller('web-scraping')
export class ScrapperController {
  constructor(
    private readonly responseHandler: ResponseHandler,
    private readonly _logService: LoggerService,
    private _service: scrapeService,
  ) {}

  @Post('scrape')
  @ApiOperation({ summary: 'Scrape the provided Web URL' })
  @ApiResponse({ status: 200, description: 'Returns HTML Tag inner text!' })
  async scrapeWebsite(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: scrapperDto,
  ): Promise<any> {
    try {
      const { url, tag, attribute } = body;
      if (!tag && !attribute) {
        return this.responseHandler.sendErrorResponse(
          res, HTTP_STATUS_CODE.BAD_REQUEST,
          MESSAGES.PLEASE_SPECIFY
        )
      }
      const result = await this._service.fetchDetails(body, res);
      this._logService.logResponse(result);
      return await this.responseHandler.sendResponse(
        res,
        HTTP_STATUS_CODE.OK,
        true,
        STATUS_MSG.SUCCESS.message,
        result,
      );
    } catch (error) {
      console.error(error);
      return await this.responseHandler.sendErrorResponse(
        res,
        HTTP_STATUS_CODE.BAD_REQUEST,
        error?.message,
        error?.errors,
      );
    }
  }
}
