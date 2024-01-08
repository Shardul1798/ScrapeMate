import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { IResponse } from './global.interface';
export declare class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}
export declare class ResponseHandler {
    sendResponse(res: Response | IResponse, statusCode: number, success: boolean, message: string, data?: object): Promise<void>;
    sendErrorResponse(res: Response | IResponse, statusCode: number, message: string, type?: string): Promise<void>;
}
