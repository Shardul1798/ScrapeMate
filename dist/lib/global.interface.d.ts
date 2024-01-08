export interface IResponse {
    send(source: object): any;
    status?(): any;
}
export interface ErrorRO {
    statusCode: number;
    success: boolean;
    message: object | string;
    data?: object;
    type?: string;
    error?: string;
}
