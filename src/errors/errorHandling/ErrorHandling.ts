import { AxiosError } from 'axios';

import { AppError } from '../appError/AppError';
import type { ICustomError, IError } from '../IError';

class ErrorHandling {
  private readonly _statusCode: number;
  private readonly _message: string;

  constructor(error: AxiosError | AppError | ICustomError, defaultMessage: string = '') {
    if (error instanceof AppError) {
      this._statusCode = error.statusCode ?? 400;
      this._message = error.message ?? defaultMessage;
    } else if (error instanceof AxiosError) {
      this._statusCode = error.response?.status ?? 400;
      this._message =
        (error as ICustomError)?.response?.data?.message ?? error.message ?? defaultMessage;
    } else if ('message' in error) {
      this._statusCode = error?.response?.status ?? 400;
      this._message = error?.response?.data?.message ?? error.message ?? defaultMessage;
    } else {
      this._statusCode = 400;
      this._message = defaultMessage;
    }
  }

  get error(): IError {
    return {
      statusCode: this._statusCode,
      message: this._message,
    };
  }
}

export { ErrorHandling };
