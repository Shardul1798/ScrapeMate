import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';
import { LoggerService } from 'src/lib/logger/logger.provider';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new LoggerService();
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    console.log(`REQUEST::::`, req.body);
    this.logRequestDetails(req);

    return next.handle().pipe(tap((response) => {
      // console.log(`this is pipe tap response`,response)
    }));
  }

  private logRequestDetails(req: Request): void {
    // console.log(`inside log request details`);
    this.logger.logRequest(req);
  }

  public logResponseDetails(res: any): void {
    // console.log(`inside log response details`, res);
    this.logger.logResponse(res);
  }
}
