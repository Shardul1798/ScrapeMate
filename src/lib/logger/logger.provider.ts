import { Injectable,Logger } from '@nestjs/common';


@Injectable()
export class LoggerService extends Logger {
  logRequest(req: any): void {
    this.log(
      `Request: [${req?.method}] ${req?.originalUrl} ${JSON.stringify(
        req?.body,
      )}`,
      'RequestInterceptor',
    );
  }

  logResponse(res: any): void {
    this.log(`Response: ${JSON.stringify(res)}`, 'ResponseInterceptor');
  }
}
