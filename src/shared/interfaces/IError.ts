import type { AxiosError } from 'axios';

export interface IGetError {
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
  statusCode?: number;
  message: string;
}

export type IError = AxiosError | ICustomError | Error | unknown;

export type IHandleError = {
  error?: IError;
  customMessage?: string;
  customStatusCode?: number;
  showToast?: boolean;
  returnBoolean?: boolean;
};

export type IHandleErrorResponse = {
  raw?: IError;
  message?: string;
  statusCode?: number;
};
