import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export declare class AppMiddleware implements NestMiddleware {
    httpTransportOptions: {
        host: string;
        ssl: boolean;
    };
    logger1: import("winston").Logger;
    private logger;
    use(request: Request, response: Response, next: NextFunction): void;
}
