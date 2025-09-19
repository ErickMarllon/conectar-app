export type PresetsOption = {
  name: string;
  value: string;
};

export type ColorVariants = {
  name: string;
  lighter: string;
  light: string;
  main: string;
  dark: string;
  darker: string;
  contrastText: string;
};

export type ThemeStretchValue = boolean;
export type ThemeModeValue = 'light' | 'dark';
export type ThemeDirectionValue = 'rtl' | 'ltr';
export type ThemeContrastValue = 'default' | 'bold';
export type ThemeLayoutValue = 'vertical' | 'horizontal' | 'mini';
export type ThemeColorPresetsValue = 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red';
export type ThemeFontFamily = 'Public_Sans' | 'Inter' | 'DM_Sans' | 'Nunito_Sans' | 'Poppins';
export type ThemeFontSize = number;
export type ThemeLangs = 'en' | 'fr' | 'vn' | 'cn' | 'ar';

export type SettingsBase = {
  themeMode: ThemeModeValue;
  themeLayout: ThemeLayoutValue;
  themeStretch: ThemeStretchValue;
  themeContrast: ThemeContrastValue;
  themeDirection: ThemeDirectionValue;
  themeColorPresets: ThemeColorPresetsValue;
  themeFontFamily: ThemeFontFamily;
  themeFontSize: ThemeFontSize;
  language: ThemeLangs;
};

export type SettingsValueProps = SettingsBase & {
  colorPresets: ColorVariants[];
};

export type ThemeSettings = SettingsBase & {
  presetsOption: PresetsOption[];
};

export type ThemeActions = {
  setThemeMode: (mode: ThemeModeValue) => void;
  setThemeLayout: (layout: ThemeLayoutValue) => void;
  setStretchValue: (stretch: ThemeStretchValue) => void;
  setThemeDirection: (direction: ThemeDirectionValue) => void;
  setThemeFontFamily: (font: ThemeFontFamily) => void;
  setThemeFontSize: (size: number) => void;
  setLanguage: (language: ThemeLangs) => void;
  setThemeColorPresets: (color: ThemeColorPresetsValue) => void;
  setThemeContrast: (contrast: ThemeContrastValue) => void;
  onToggleMode: () => void;
  onToggleLayout: () => void;
  onResetSetting: () => void;
};
