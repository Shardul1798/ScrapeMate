"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMiddleware = void 0;
const common_1 = require("@nestjs/common");
const winston_1 = require("winston");
const constants_1 = require("./constants/constants");
let AppMiddleware = class AppMiddleware {
    constructor() {
        this.httpTransportOptions = {
            host: constants_1.appConfig.datadogConfig.host,
            ssl: true,
        };
        this.logger1 = (0, winston_1.createLogger)({
            level: 'info',
            exitOnError: false,
            format: winston_1.format.json(),
            transports: [new winston_1.transports.Http(this.httpTransportOptions)],
        });
        this.logger = new common_1.Logger('HTTP');
    }
    use(request, response, next) {
        this.logger.log(request);
        const { ip, method, originalUrl } = request;
        const userAgent = request.get('user-agent') || '';
        response.on('close', () => {
            const { statusCode } = response;
            const contentLength = response.get('content-length');
            this.logger.log(`${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`);
        });
        next();
    }
};
exports.AppMiddleware = AppMiddleware;
exports.AppMiddleware = AppMiddleware = __decorate([
    (0, common_1.Injectable)()
], AppMiddleware);
//# sourceMappingURL=app.middleware.js.map