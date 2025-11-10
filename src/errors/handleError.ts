import { toast } from 'react-toastify';
import type { IHandleError, IHandleErrorResponse } from '@/shared/interfaces/IError';
import { ErrorHandling } from './errorHandling/ErrorHandling';

export function handleError({
  error,
  customMessage,
  customStatusCode,
  showToast = true,
}: IHandleError): IHandleErrorResponse {
  let message = 'Ocorreu um erro inesperado';
  let statusCode: number | undefined = undefined;

  if (error) {
    const handler = new ErrorHandling(error);
    message = customMessage ?? handler.error.message;
    statusCode = customStatusCode ?? handler.error.statusCode;
  } else if (customMessage) {
    message = customMessage;
    statusCode = customStatusCode;
  }

  if (showToast) {
    toast.error(message, { containerId: message });
  }

  return {
    message,
    statusCode,
    raw: error,
  };
}
