import { createContext } from 'react';
import type { DashboardUserModalContextProps } from './types';

export const DashboardUserModalContext = createContext<DashboardUserModalContextProps | undefined>(
  undefined,
);
