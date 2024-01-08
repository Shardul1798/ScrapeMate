"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHandler = exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const err = exception.getResponse();
        if (err.hasOwnProperty('message')) {
            if (err.message instanceof Array) {
                err.message = err.message[0];
            }
        }
        response.status(exception.getStatus()).json(exception.getResponse());
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], HttpExceptionFilter);
let ResponseHandler = class ResponseHandler {
    async sendResponse(res, statusCode, success, message, data) {
        const response = {
            statusCode: statusCode,
            success: success,
            message: message,
            data: data ? data : {},
        };
        res.status(statusCode).json(response);
    }
    async sendErrorResponse(res, statusCode, message, type = 'BAD_REQUEST') {
        const response = {
            statusCode: statusCode,
            success: false,
            message: message,
            type: type,
        };
        throw new common_1.HttpException(response, statusCode);
    }
};
exports.ResponseHandler = ResponseHandler;
exports.ResponseHandler = ResponseHandler = __decorate([
    (0, common_1.Injectable)()
], ResponseHandler);
//# sourceMappingURL=response.handler.js.map