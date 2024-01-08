import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

export const config = dotenv.config({
  path: join(process.cwd() + '/.env.development'),
});

export const STATUS_MSG = {
  ERROR: {
    BAD_REQUEST(message: string) {
      return {
        statusCode: 400,
        success: false,
        message: message,
        type: 'BAD_REQUEST',
      };
    },

    ERROR_OCCURED: {
      statusCode: 400,
      success: false,
      message: 'error occured',
    },

    UNAUTHORIZED: {
      statusCode: 401,
      success: false,
      message: 'You are not authorized to perform this action',
      type: 'UNAUTHORIZED',
    },
  },

  SUCCESS: {
    statusCode: 200,
    success: true,
    message: 'Success',
  },

  SUCCESS_WITH_MESSAGE(message: string) {
    return {
      statusCode: 200,
      success: true,
      message: message,
      type: 'Success',
    };
  },
};

export const HTTP_STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  UPDATED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
};

export const MESSAGES = {
  ERROR: {
    INVALID_URL: {
      statusCode: HTTP_STATUS_CODE.BAD_REQUEST,
      type: 'INVALID_URL',
      message: 'Invalid URL',
    },
  },
  PLEASE_SPECIFY : "Please Specify a tag or an attribute"
};

export const APP_CONSTANTS = {
  LOGGER_NAME : "Logger",
  LOGS_LEVEL: {
    INFO: 'info',
    ERROR: 'error',
  },

  FIELD_NAME: {
    url: 'url',
    tag: 'tag',
    attribute: 'attribute',
    invalidField: 'invalidField',
  },

  LOG_FILENAME: '/logs/app_logs.log',
  ERR_LOG_FILENAME: '/logs/app_err_logs.log',

  LOG_LABELS: {
    GLOBAL_EXCEPTION: 'GLOBAL_EXCEPTION',
    REQUEST_RECEIVED: 'REQUEST_RECEIVED',
    MIDDLEWARE_ERROR: 'MIDDLEWARE_ERROR',
    SUCCESS_RESPONSE: 'SUCCESS_RESPONSE',
    ERROR_RESPONSE: 'ERROR_RESPONSE',
  },
  WEB_URL_REGEX: /^(https?|http):\/\/[^\s/$.?#].[^\s]*$/,
  VALIDATION_MESSAGES: {
    url: ['URL: Invalid URL.', 'URL must not be empty'],
    tag: ['Tag: Invalid HTML Tag', 'HTML Tag must be a string'],
    attribute: ['attribute: Invalid attribute', 'Attribute must be a string'],
    HTML_ATTRIBUTES: ['href', 'src'],
    HTML_TAGS: [
      'p',
      'div',
      'body',
      'html',
      'img',
      'a',
      'section',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'title'
    ],
  },
};

export const METHOD = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT',
};

export const appConfig = {
  nodeEnv: {
    DEV: 'development',
  },
  datadogConfig: {
    env: process.env.ENV,
    version: process.env.VERSION,
    host: process.env.HOST,
    port: process.env.port,
  },
};

export const ERRORS_MSG = {
  URL_REQ: 'Web URL is required',
  INTERNAL_SERVER_ERROR: 'Internal Server Error!',
  SOMETHING_WENT_WORNG: 'Something went wrong! Please try again.',
  NO_ERROR: 'No Error',
};
