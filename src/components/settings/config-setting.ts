// components

import { presets } from './presets';
import type { SettingsValueProps } from './types';

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const defaultSettings: SettingsValueProps = {
  language: 'en',
  themeMode: 'light',
  themeDirection: 'ltr',
  themeContrast: 'default',
  themeLayout: 'vertical',
  themeColorPresets: 'default',
  themeStretch: false,
  themeFontFamily: 'Public_Sans',
  themeFontSize: 16,
  colorPresets: presets,
};
