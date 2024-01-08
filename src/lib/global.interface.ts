export interface IResponse {
  send(source: object);
  status?();
}

export interface ErrorRO {
  statusCode: number;
  success: boolean;
  message: object | string;
  data?: object;
  type?: string;
  error?: string;
}
