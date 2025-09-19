import { createContext } from 'react';
import type { ErrorRedirectContextType } from './types';

const ErrorRedirectContext = createContext<ErrorRedirectContextType | undefined>(undefined);

export { ErrorRedirectContext };
