import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorRO, IResponse } from './global.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const err: ErrorRO = exception.getResponse() as ErrorRO;
    if (err.hasOwnProperty('message')) {
      if (err.message instanceof Array) {
        err.message = err.message[0];
      }
    }
    response.status(exception.getStatus()).json(exception.getResponse());
  }
}
@Injectable()
export class ResponseHandler {
  async sendResponse(
    res: Response | IResponse,
    statusCode: number,
    success: boolean,
    message: string,
    data?: object,
  ) {
    const response = {
      statusCode: statusCode,
      success: success,
      message: message,
      data: data ? data : {},
    };
    // const logger = logHandler('info', 'Response', response);
    // (await logger).info(response);
    res.status(statusCode).json(response);
  }

  async sendErrorResponse(
    res: Response | IResponse,
    statusCode: number,
    message: string,
    type: string = 'BAD_REQUEST',
  ) {
    const response = {
      statusCode: statusCode,
      success: false,
      message: message,
      type: type,
    };
    // const logger = await logHandler('error', 'Error', response);
    // logger.error(response);
    throw new HttpException(response, statusCode);
  }
}
