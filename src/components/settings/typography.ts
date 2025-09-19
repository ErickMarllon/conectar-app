import type { PresetsOption, ThemeFontFamily } from './types';

// ----------------------------------------------------------------------

export const fontFamilyOptions: PresetsOption[] = [
  { name: 'Public Sans', value: 'Public_Sans' },
  { name: 'Inter', value: 'Inter' },
  { name: 'DM Sans', value: 'DM_Sans' },
  { name: 'Nunito Sans', value: 'Nunito_Sans' },
  { name: 'Poppins', value: 'Poppins' },
];

export const defaultFont = fontFamilyOptions[0];
export const cyanFont = fontFamilyOptions[1];
export const purpleFont = fontFamilyOptions[2];
export const blueFont = fontFamilyOptions[3];
export const orangeFont = fontFamilyOptions[4];
export const redFont = fontFamilyOptions[5];

export const presetsOption: PresetsOption[] = fontFamilyOptions.map((font) => ({
  name: font.name,
  value: font.value,
}));

export function getFontFamily(key: ThemeFontFamily) {
  return {
    Public_Sans: defaultFont,
    Inter: cyanFont,
    DM_Sans: purpleFont,
    Nunito_Sans: blueFont,
    Poppins: orangeFont,
  }[key];
}
