import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeBackground {
    neutral: string;
  }

  interface SimplePaletteColorOptions {
    lighter: string;
    darker: string;
  }

  interface PaletteColor {
    lighter: string;
    darker: string;
  }
}
