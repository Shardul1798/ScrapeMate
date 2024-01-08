import * as dotenv from 'dotenv';
export declare const config: dotenv.DotenvConfigOutput;
export declare const STATUS_MSG: {
    ERROR: {
        BAD_REQUEST(message: string): {
            statusCode: number;
            success: boolean;
            message: string;
            type: string;
        };
        ERROR_OCCURED: {
            statusCode: number;
            success: boolean;
            message: string;
        };
        UNAUTHORIZED: {
            statusCode: number;
            success: boolean;
            message: string;
            type: string;
        };
    };
    SUCCESS: {
        statusCode: number;
        success: boolean;
        message: string;
    };
    SUCCESS_WITH_MESSAGE(message: string): {
        statusCode: number;
        success: boolean;
        message: string;
        type: string;
    };
};
export declare const HTTP_STATUS_CODE: {
    OK: number;
    CREATED: number;
    UPDATED: number;
    NO_CONTENT: number;
    BAD_REQUEST: number;
    UNAUTHORIZED: number;
    INTERNAL_SERVER_ERROR: number;
    BAD_GATEWAY: number;
};
export declare const MESSAGES: {
    ERROR: {
        INVALID_URL: {
            statusCode: number;
            type: string;
            message: string;
        };
    };
    PLEASE_SPECIFY: string;
};
export declare const APP_CONSTANTS: {
    LOGGER_NAME: string;
    LOGS_LEVEL: {
        INFO: string;
        ERROR: string;
    };
    FIELD_NAME: {
        url: string;
        tag: string;
        attribute: string;
        invalidField: string;
    };
    LOG_FILENAME: string;
    ERR_LOG_FILENAME: string;
    LOG_LABELS: {
        GLOBAL_EXCEPTION: string;
        REQUEST_RECEIVED: string;
        MIDDLEWARE_ERROR: string;
        SUCCESS_RESPONSE: string;
        ERROR_RESPONSE: string;
    };
    WEB_URL_REGEX: RegExp;
    VALIDATION_MESSAGES: {
        url: string[];
        tag: string[];
        attribute: string[];
        HTML_ATTRIBUTES: string[];
        HTML_TAGS: string[];
    };
};
export declare const METHOD: {
    GET: string;
    POST: string;
    DELETE: string;
    PUT: string;
};
export declare const appConfig: {
    nodeEnv: {
        DEV: string;
    };
    datadogConfig: {
        env: string;
        version: string;
        host: string;
        port: string;
    };
};
export declare const ERRORS_MSG: {
    URL_REQ: string;
    INTERNAL_SERVER_ERROR: string;
    SOMETHING_WENT_WORNG: string;
    NO_ERROR: string;
};
