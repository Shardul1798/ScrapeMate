import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { createLogger, format, transports } from 'winston';
import { appConfig } from './constants/constants';


@Injectable()
export class AppMiddleware implements NestMiddleware {
  httpTransportOptions = {
    host: appConfig.datadogConfig.host,
    ssl: true,
  };
  logger1 = createLogger({
    level: 'info',
    exitOnError: false,
    format: format.json(),
    transports: [new transports.Http(this.httpTransportOptions)],
  });

  private logger = new Logger('HTTP');
  use(request: Request, response: Response, next: NextFunction): void {
    this.logger.log(request);
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
      );
    });
    next();
  }
}
