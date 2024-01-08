"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrapperController = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("./dto");
const swagger_1 = require("@nestjs/swagger");
const response_handler_1 = require("../../../lib/response.handler");
const constants_1 = require("../../../constants/constants");
const service_1 = require("./service");
const logger_provider_1 = require("../../../lib/logger/logger.provider");
let ScrapperController = class ScrapperController {
    constructor(responseHandler, _logService, _service) {
        this.responseHandler = responseHandler;
        this._logService = _logService;
        this._service = _service;
    }
    async scrapeWebsite(req, res, body) {
        try {
            const { url, tag, attribute } = body;
            if (!tag && !attribute) {
                return this.responseHandler.sendErrorResponse(res, constants_1.HTTP_STATUS_CODE.BAD_REQUEST, constants_1.MESSAGES.PLEASE_SPECIFY);
            }
            const result = await this._service.fetchDetails(body, res);
            this._logService.logResponse(result);
            return await this.responseHandler.sendResponse(res, constants_1.HTTP_STATUS_CODE.OK, true, constants_1.STATUS_MSG.SUCCESS.message, result);
        }
        catch (error) {
            console.error(error);
            return await this.responseHandler.sendErrorResponse(res, constants_1.HTTP_STATUS_CODE.BAD_REQUEST, error?.message, error?.errors);
        }
    }
};
exports.ScrapperController = ScrapperController;
__decorate([
    (0, common_1.Post)('scrape'),
    (0, swagger_1.ApiOperation)({ summary: 'Scrape the provided Web URL' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns HTML Tag inner text!' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object, dto_1.scrapperDto]),
    __metadata("design:returntype", Promise)
], ScrapperController.prototype, "scrapeWebsite", null);
exports.ScrapperController = ScrapperController = __decorate([
    (0, common_1.Controller)('web-scraping'),
    __metadata("design:paramtypes", [response_handler_1.ResponseHandler,
        logger_provider_1.LoggerService,
        service_1.scrapeService])
], ScrapperController);
//# sourceMappingURL=controller.js.map