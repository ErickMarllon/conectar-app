import { createContext } from 'react';
import type { IAuthContextProps } from './types';

const AuthContext = createContext<IAuthContextProps | undefined>(undefined);

export { AuthContext };
