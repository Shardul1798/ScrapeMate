export declare function createAuthHeader(token: any): Promise<{
    Authorization: string;
}>;
export declare function customValidationMessage(pattern: RegExp, customErrorMessage: string, fieldName: string): PropertyDecorator;
declare function logHandler(level: any, message: any, data: any): Promise<import("winston").Logger>;
export { logHandler };
