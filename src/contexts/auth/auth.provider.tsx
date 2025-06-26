import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './auth.context';
import { LocalStorageService } from '@/services/localStorageService';
import type { IUserBase } from '@/shared/interfaces/IUser';
import { useLocation, useNavigate } from 'react-router-dom';
import { protectedRoutes } from '@/routes/authRoutes';
import { UserRole } from '@/shared/constants/enums';

interface IAuthProviderProps {
  children: React.ReactNode;
}
const firstRoutes = ['/dashboard', '/profile'];
function AuthProvider({ children }: IAuthProviderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<IUserBase | null>(() => {
    const storedUser = LocalStorageService.getUser();
    const tokens = LocalStorageService.getAuthTokens();
    return storedUser && tokens ? { ...storedUser, ...tokens } : null;
  });

  const isAuthorized = useMemo(() => {
    if (!user) return false;
    const currentPath = location.pathname;
    const allowedRoles = protectedRoutes[currentPath];
    const hasAccess = allowedRoles?.includes(user.role as UserRole);
    return !allowedRoles || hasAccess ? true : false;
  }, [location.pathname, user]);

  useEffect(() => {
    if (!isAuthorized && !user) {
      navigate('/', { replace: true });
    }
    if (!isAuthorized && user) {
      const fallback = firstRoutes.find((path) => {
        const roles = protectedRoutes[path];
        return roles?.includes(user.role as UserRole);
      });
      navigate(fallback || '', { replace: true });
    }
  }, [isAuthorized, user, navigate]);

  const logout = useCallback(() => {
    console.log('clicou');
    LocalStorageService.cleanStorage();
    setUser(null);
    navigate('/');
  }, [navigate]);

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      logout,
      isAuthorized,
    }),
    [user, logout, isAuthorized],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export { AuthProvider };
