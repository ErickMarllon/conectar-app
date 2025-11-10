import { create } from 'zustand';
import type { ThemeActions, ThemeSettings } from '@/components/settings/types';
import { defaultSettings } from '@/components/settings/config-setting';
import { presetsOption } from '@/components/settings/presets';
import { CookiesService } from '@/services/cookies';

type ThemeState = ThemeSettings & ThemeActions;

const getInitialSettings = (): ThemeSettings => ({
  ...defaultSettings,
  presetsOption,
  language: CookiesService.getItem('i18next') ?? defaultSettings.language,
  themeMode: CookiesService.getItem('theme_Mode') ?? defaultSettings.themeMode,
  themeLayout: CookiesService.getItem('theme_Layout') ?? defaultSettings.themeLayout,
  themeStretch: CookiesService.getItem('theme_Stretch') ?? defaultSettings.themeStretch,
  themeDirection: CookiesService.getItem('theme_Direction') ?? defaultSettings.themeDirection,
  themeFontFamily: CookiesService.getItem('theme_FontFamily') ?? defaultSettings.themeFontFamily,
  themeFontSize: Number(CookiesService.getItem('theme_FontSize') ?? defaultSettings.themeFontSize),
  themeColorPresets: CookiesService.getItem('theme_Color') ?? defaultSettings.themeColorPresets,
  themeContrast: CookiesService.getItem('theme_Contrast') ?? defaultSettings.themeContrast,
});

export const useThemesStore = create<ThemeState>()((set, get) => ({
  ...getInitialSettings(),
  setLanguage: (language) => {
    set({ language });
    CookiesService.setItem('i18next', language);
  },
  setThemeMode: (themeMode) => {
    set({ themeMode });
    CookiesService.setItem('theme_Mode', themeMode);
  },
  setThemeLayout: (themeLayout) => {
    set({ themeLayout });
    CookiesService.setItem('theme_Layout', themeLayout);
  },
  setStretchValue: (themeStretch) => {
    set({ themeStretch });
    CookiesService.setItem('theme_Stretch', themeStretch);
  },
  setThemeDirection: (themeDirection) => {
    set({ themeDirection });
    CookiesService.setItem('theme_Direction', themeDirection);
  },
  setThemeFontFamily: (themeFontFamily) => {
    set({ themeFontFamily });
    CookiesService.setItem('theme_FontFamily', themeFontFamily);
  },
  setThemeFontSize: (themeFontSize) => {
    set({ themeFontSize });
    CookiesService.setItem('theme_FontSize', themeFontSize);
  },
  setThemeColorPresets: (themeColorPresets) => {
    set({ themeColorPresets });
    CookiesService.setItem('theme_Color', themeColorPresets);
  },
  setThemeContrast: (themeContrast) => {
    set({ themeContrast });
    CookiesService.setItem('theme_Contrast', themeContrast);
  },
  onToggleMode: () => {
    const mode = get().themeMode === 'light' ? 'dark' : 'light';
    set({ themeMode: mode });
    CookiesService.setItem('theme_Mode', mode);
  },
  onToggleLayout: () => {
    const mode = get().themeLayout === 'vertical' ? 'mini' : 'vertical';
    set({ themeLayout: mode });
    CookiesService.setItem('theme_Layout', mode);
  },
  onResetSetting: () => {
    set({ ...defaultSettings });
    Object.keys(defaultSettings).forEach((key) => {
      CookiesService.removeItem(`theme_${key}`);
    });
  },
}));
