import { scrapperDto } from './dto';
import { Response } from 'express';
import { ResponseHandler } from 'src/lib/response.handler';
import { scrapeService } from './service';
import { LoggerService } from 'src/lib/logger/logger.provider';
export declare class ScrapperController {
    private readonly responseHandler;
    private readonly _logService;
    private _service;
    constructor(responseHandler: ResponseHandler, _logService: LoggerService, _service: scrapeService);
    scrapeWebsite(req: Request, res: Response, body: scrapperDto): Promise<any>;
}
