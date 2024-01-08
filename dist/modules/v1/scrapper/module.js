"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebScrapingModule = void 0;
const common_1 = require("@nestjs/common");
const controller_1 = require("./controller");
const response_handler_1 = require("../../../lib/response.handler");
const service_1 = require("./service");
const logger_provider_1 = require("../../../lib/logger/logger.provider");
let WebScrapingModule = class WebScrapingModule {
};
exports.WebScrapingModule = WebScrapingModule;
exports.WebScrapingModule = WebScrapingModule = __decorate([
    (0, common_1.Module)({
        controllers: [controller_1.ScrapperController],
        providers: [response_handler_1.ResponseHandler, service_1.scrapeService, logger_provider_1.LoggerService]
    })
], WebScrapingModule);
//# sourceMappingURL=module.js.map