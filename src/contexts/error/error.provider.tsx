import * as React from 'react';
import { ErrorRedirectContext } from './error.context';
import { PATH_PAGE } from '@/routes/paths';

export const SIDEBAR_WIDTH_MOBILE = '18rem';

const ErrorRedirectProvider = ({ children }: { children: React.ReactNode }) => {
  const handleHttpError = (status: number) => {
    switch (status) {
      case 403:
        window.location.href = PATH_PAGE.page403;
        break;
      case 404:
        window.location.href = PATH_PAGE.page404;
        break;
      case 500:
        window.location.href = PATH_PAGE.page500;
        break;
      default:
        break;
    }
  };

  return (
    <ErrorRedirectContext.Provider value={{ handleHttpError }}>
      {children}
    </ErrorRedirectContext.Provider>
  );
};
export { ErrorRedirectProvider };
