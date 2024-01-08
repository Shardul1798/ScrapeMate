import { Module } from '@nestjs/common';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as moment from 'moment';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { LoggerService } from './logger.provider';
import { APP_CONSTANTS } from 'src/constants/constants';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.File({
          filename: process.cwd() + '/logs/Combined-' + moment().format('MMMM-YYYY') + '.log',
          level: 'info',
          handleExceptions: true,
          maxFiles: 1,
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike(APP_CONSTANTS.LOGGER_NAME, {
              colors: true,
              prettyPrint: true,
            }),
            winston.format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message} ${info.stack ? info.stack : ''}`)
          ),
        }),
        new winston.transports.File({
          filename: process.cwd() + '/logs/Errors-' + moment().format('MMMM-YYYY') + '.log',
          level: 'error',
          maxFiles: 3,
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike(APP_CONSTANTS.LOGGER_NAME, {
              colors: true,
              prettyPrint: true,
            }),
            winston.format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message} ${info.stack ? info.stack : ''}`)
          ),
        }),
        new DailyRotateFile({
          filename: process.cwd() + '/logs/Combined-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike(APP_CONSTANTS.LOGGER_NAME, {
              colors: true,
              prettyPrint: true,
            }),
            winston.format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message} ${info.stack ? info.stack : ''}`)
          ),
        }),
      ],
    }),
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule { }
