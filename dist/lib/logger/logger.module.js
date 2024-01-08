"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerModule = void 0;
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const winston = require("winston");
const moment = require("moment");
const DailyRotateFile = require("winston-daily-rotate-file");
const logger_provider_1 = require("./logger.provider");
const constants_1 = require("../../constants/constants");
let LoggerModule = class LoggerModule {
};
exports.LoggerModule = LoggerModule;
exports.LoggerModule = LoggerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nest_winston_1.WinstonModule.forRoot({
                transports: [
                    new winston.transports.File({
                        filename: process.cwd() + '/logs/Combined-' + moment().format('MMMM-YYYY') + '.log',
                        level: 'info',
                        handleExceptions: true,
                        maxFiles: 1,
                        format: winston.format.combine(winston.format.timestamp(), winston.format.ms(), nest_winston_1.utilities.format.nestLike(constants_1.APP_CONSTANTS.LOGGER_NAME, {
                            colors: true,
                            prettyPrint: true,
                        }), winston.format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message} ${info.stack ? info.stack : ''}`)),
                    }),
                    new winston.transports.File({
                        filename: process.cwd() + '/logs/Errors-' + moment().format('MMMM-YYYY') + '.log',
                        level: 'error',
                        maxFiles: 3,
                        format: winston.format.combine(winston.format.timestamp(), winston.format.ms(), nest_winston_1.utilities.format.nestLike(constants_1.APP_CONSTANTS.LOGGER_NAME, {
                            colors: true,
                            prettyPrint: true,
                        }), winston.format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message} ${info.stack ? info.stack : ''}`)),
                    }),
                    new DailyRotateFile({
                        filename: process.cwd() + '/logs/Combined-%DATE%.log',
                        datePattern: 'YYYY-MM-DD',
                        zippedArchive: true,
                        maxSize: '20m',
                        maxFiles: '14d',
                        format: winston.format.combine(winston.format.timestamp(), winston.format.ms(), nest_winston_1.utilities.format.nestLike(constants_1.APP_CONSTANTS.LOGGER_NAME, {
                            colors: true,
                            prettyPrint: true,
                        }), winston.format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message} ${info.stack ? info.stack : ''}`)),
                    }),
                ],
            }),
        ],
        providers: [logger_provider_1.LoggerService],
        exports: [logger_provider_1.LoggerService],
    })
], LoggerModule);
//# sourceMappingURL=logger.module.js.map