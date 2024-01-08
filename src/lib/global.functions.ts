import { join } from 'path';
import * as fs from 'fs';
import { Matches, ValidationArguments } from 'class-validator';
import { createLogger, format, transports } from 'winston';
import { APP_CONSTANTS } from 'src/constants/constants';

export async function createAuthHeader(token) {
  return { Authorization: 'Bearer ' + token };
}

export function customValidationMessage(
  pattern: RegExp,
  customErrorMessage: string,
  fieldName: string,
) {
  let errorMessage: string;

  switch (fieldName) {
    case APP_CONSTANTS.FIELD_NAME.url:
      errorMessage = APP_CONSTANTS.VALIDATION_MESSAGES.url[0];
      break;
    case APP_CONSTANTS.FIELD_NAME.tag:
      errorMessage = APP_CONSTANTS.VALIDATION_MESSAGES.tag[0];
      break;
    case APP_CONSTANTS.FIELD_NAME.attribute:
      errorMessage = APP_CONSTANTS.VALIDATION_MESSAGES.attribute[0];
      break;
    default:
      errorMessage = APP_CONSTANTS.FIELD_NAME.invalidField;
      break;
  }
  return Matches(pattern, {
    message: (args: ValidationArguments) => {
      if (!args.value) {
        return customErrorMessage;
      }
      return errorMessage;
    },
  });
}

async function logHandler(level, message, data) {
  const httpTransportOptions = {
    host: process.env.HOST,
    ssl: true,
  };

  const logger = createLogger({
    level: level,
    exitOnError: false,
    format: format.combine(
      format.json(),
      format.printf(() => {
        return `${level}: ${message}: ${data}`;
      }),
    ),
    transports: [
      new transports.Console(), // Adding Console transport for terminal logging
      new transports.Http(httpTransportOptions),
    ],
  });

  return logger;
}

// Export the function so it can be used in another file
export { logHandler };
