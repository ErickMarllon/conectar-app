import type { IUserBase } from '@/shared/interfaces/IUser';
import type React from 'react';

interface IAuthContextProps {
  user?: IUserBase | null;
  setUser: React.Dispatch<React.SetStateAction<IUserBase | null>>;
  logout: () => void;
  isAuthorized: boolean;
}

export type { IAuthContextProps };
