import { create } from 'zustand';
import type { IThemeMode, IThemeVariant } from '@/shared/interfaces/ITheme';
import { LocalStorageService } from '@/services/localStorageService';

interface ThemeState {
  theme: IThemeVariant;
  mode: IThemeMode;
  setTheme: (theme: IThemeVariant) => void;
  setMode: (mode: IThemeMode) => void;
  initialize: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'default',
  mode: 'light',

  initialize: () => {
    const initial = LocalStorageService.getTheme();
    const theme = initial.theme ?? 'default';
    const mode = initial.mode ?? 'light';
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-mode', mode);

    set({ theme, mode });
  },

  setTheme: (theme) =>
    set((state) => {
      document.documentElement.setAttribute('data-theme', theme);

      LocalStorageService.setTheme({
        ...LocalStorageService.getTheme(),
        theme,
        mode: state.mode,
      });

      return { theme };
    }),

  setMode: (mode) =>
    set((state) => {
      document.documentElement.setAttribute('data-mode', mode);

      LocalStorageService.setTheme({
        ...LocalStorageService.getTheme(),
        mode,
        theme: state.theme,
      });

      return { mode };
    }),
}));
