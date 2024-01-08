import { Logger } from '@nestjs/common';
export declare class LoggerService extends Logger {
    logRequest(req: any): void;
    logResponse(res: any): void;
}
