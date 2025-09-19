import { PROTECTED_ROUTES } from '@/routes/paths';
import { AuthService } from '@/services/authService';
import { LocalStorageService } from '@/services/localStorageService';
import { UserRole } from '@/shared/enums';
import type { IUserAuth } from '@/shared/interfaces/IUser';
import { create } from 'zustand';

interface AuthState {
  user?: Partial<IUserAuth> | null;
  isAuthorized: (pathname: string) => boolean;
  setUser: (user: Partial<IUserAuth> | null) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: (() => {
    const storedUser = LocalStorageService.getUser();
    const tokens = LocalStorageService.getAuthTokens();
    return storedUser && tokens ? { ...storedUser, ...tokens } : null;
  })(),

  isAuthenticated: () => {
    const { user } = get();
    return !!(user?.access_token && user?.refresh_token);
  },

  isAuthorized: (pathname: string) => {
    const { user, isAuthenticated } = get();
    if (!isAuthenticated() || !user?.role) return false;

    const allowedRoles = PROTECTED_ROUTES[pathname];
    return !allowedRoles || allowedRoles.includes(user.role as UserRole);
  },

  isAdmin: () => {
    const { user, isAuthenticated } = get();
    if (!isAuthenticated() || !user?.role) return false;

    return user.role.toLowerCase() === 'admin';
  },

  setUser: (user: Partial<IUserAuth> | null) => {
    if (user) {
      const { access_token, refresh_token, ...base } = user;
      LocalStorageService.setUser(base);

      if (access_token && refresh_token) {
        LocalStorageService.setAuthTokens({ access_token, refresh_token });
      }

      set({ user });
    }
  },

  logout: async () => {
    await AuthService.logout();
    LocalStorageService.cleanStorage();
    set({ user: null });
  },
}));
