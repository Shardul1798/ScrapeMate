"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logHandler = exports.customValidationMessage = exports.createAuthHeader = void 0;
const class_validator_1 = require("class-validator");
const winston_1 = require("winston");
const constants_1 = require("../constants/constants");
async function createAuthHeader(token) {
    return { Authorization: 'Bearer ' + token };
}
exports.createAuthHeader = createAuthHeader;
function customValidationMessage(pattern, customErrorMessage, fieldName) {
    let errorMessage;
    switch (fieldName) {
        case constants_1.APP_CONSTANTS.FIELD_NAME.url:
            errorMessage = constants_1.APP_CONSTANTS.VALIDATION_MESSAGES.url[0];
            break;
        case constants_1.APP_CONSTANTS.FIELD_NAME.tag:
            errorMessage = constants_1.APP_CONSTANTS.VALIDATION_MESSAGES.tag[0];
            break;
        case constants_1.APP_CONSTANTS.FIELD_NAME.attribute:
            errorMessage = constants_1.APP_CONSTANTS.VALIDATION_MESSAGES.attribute[0];
            break;
        default:
            errorMessage = constants_1.APP_CONSTANTS.FIELD_NAME.invalidField;
            break;
    }
    return (0, class_validator_1.Matches)(pattern, {
        message: (args) => {
            if (!args.value) {
                return customErrorMessage;
            }
            return errorMessage;
        },
    });
}
exports.customValidationMessage = customValidationMessage;
async function logHandler(level, message, data) {
    const httpTransportOptions = {
        host: process.env.HOST,
        ssl: true,
    };
    const logger = (0, winston_1.createLogger)({
        level: level,
        exitOnError: false,
        format: winston_1.format.combine(winston_1.format.json(), winston_1.format.printf(() => {
            return `${level}: ${message}: ${data}`;
        })),
        transports: [
            new winston_1.transports.Console(),
            new winston_1.transports.Http(httpTransportOptions),
        ],
    });
    return logger;
}
exports.logHandler = logHandler;
//# sourceMappingURL=global.functions.js.map