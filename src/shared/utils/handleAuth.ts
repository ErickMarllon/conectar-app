import type { AppError } from '@/errors/appError/AppError';
import { ErrorHandling } from '@/errors/errorHandling/ErrorHandling';
import type { ICustomError } from '@/errors/IError';
import type { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export function handleError(error: AxiosError | AppError | ICustomError) {
  const { message } = new ErrorHandling(error).error;

  toast.error(message);

  return message;
}
