import axios, { AxiosError } from 'axios';
import type { ICustomError, IError, IGetError } from '@/shared/interfaces/IError';
import { hasOwnValue } from '@/utils/hasOwnValue';

class ErrorHandling {
  private readonly _statusCode: number;
  private readonly _message: string;

  constructor(
    error: IError,
    defaultMessage: string = 'Erro inesperado',
    defaultStatusCode: number = 400,
  ) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<any>;
      this._statusCode = axiosError.response?.status ?? defaultStatusCode;
      this._message = axiosError?.response?.data?.message || axiosError?.message || defaultMessage;
      return;
    }

    if (error instanceof Error) {
      this._statusCode = defaultStatusCode;
      this._message = error?.message || defaultMessage;
      return;
    }
    if (hasOwnValue(error)) {
      const customError = error as ICustomError;
      if ('message' in customError && 'statusCode' in customError) {
        this._statusCode =
          customError.response?.status || customError?.statusCode || defaultStatusCode;
        this._message =
          (customError.response?.data as any)?.message || customError?.message || defaultMessage;
        return;
      }
    }

    this._statusCode = defaultStatusCode;
    this._message = defaultMessage;
  }

  get error(): IGetError {
    return {
      statusCode: this._statusCode,
      message: this._message,
    };
  }
}

export { ErrorHandling };
