
import { CssBaseline } from '@mui/material';
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  useTheme,
  type ThemeOptions,
} from '@mui/material/styles';
import { useEffect, useMemo } from 'react';
import { getPresets } from '@/components/settings/presets';
import useLocales from '@/hooks/useLocales';
import { useThemesStore } from '@/stores/themes.store';
import customShadows from '@/theme/customShadows';
import GlobalStyles from '@/theme/globalStyles';
import componentsOverride from '@/theme/overrides';
import palette from '@/theme/palette';
import shadows from '@/theme/shadows';
import { typography } from '@/theme/typography';

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const { currentLang } = useLocales();
  const outerTheme = useTheme();

  const {
    themeMode,
    themeDirection,
    themeFontFamily,
    themeFontSize,
    themeContrast,
    themeColorPresets,
  } = useThemesStore();

  const currentColor = themeColorPresets
    ? getPresets(themeColorPresets)
    : palette(themeMode).primary;
  const isLight = themeMode === 'light';

  const isContrastBold = themeContrast === 'bold';

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      currentLang,
      palette: {
        ...palette(themeMode),
        primary: currentColor,
        background: {
          ...(isContrastBold && {
            default: isLight ? outerTheme.palette.grey[100] : outerTheme.palette.grey[900],
          }),
        },
      },
      typography: typography(themeFontFamily, themeFontSize),
      shape: { borderRadius: 8 },
      direction: themeDirection,
      shadows: shadows(themeMode),
      customShadows: customShadows(themeMode, themeColorPresets),
    }),
    [
      currentLang,
      themeMode,
      currentColor,
      isContrastBold,
      isLight,
      outerTheme.palette.grey,
      themeFontFamily,
      themeFontSize,
      themeDirection,
      themeColorPresets,
    ],
  );

  const baseTheme = createTheme(themeOptions);

  const theme = createTheme({
    ...outerTheme,
    ...baseTheme,
    components: componentsOverride(baseTheme),
  });

  useEffect(() => {
    document.dir = theme.direction;
    document.body.setAttribute('dir', theme.direction);
  }, [theme.direction]);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      {children}
    </MUIThemeProvider>
  );
}
