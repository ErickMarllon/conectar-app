export interface IError {
  statusCode: number;
  message: string;
}
export interface ICustomError {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
  message: string;
}
