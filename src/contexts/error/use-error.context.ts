import { useContext } from 'react';
import { ErrorRedirectContext } from './error.context';

export const useErrorRedirect = () => {
  const context = useContext(ErrorRedirectContext);
  if (!context) throw new Error('useErrorRedirect must be used within ErrorRedirectProvider');
  return context;
};
