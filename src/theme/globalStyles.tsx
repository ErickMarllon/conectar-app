import { alpha, GlobalStyles as MUIGlobalStyles } from '@mui/material';

export default function GlobalStyles() {
  const inputGlobalStyles = (
    <MUIGlobalStyles
      styles={(theme) => ({
        '*': {
          boxSizing: 'border-box',
        },
        '*::-webkit-scrollbar': {
          width: 10,
          height: 10,
        },
        '*::-webkit-scrollbar-track': {
          borderRadius: '0.375rem',
          backgroundColor: alpha(theme.palette.primary.main, 0.2),
        },
        '*::-webkit-scrollbar-track:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
        },
        '*::-webkit-scrollbar-thumb': {
          borderRadius: '0.375rem',
          backgroundColor: alpha(theme.palette.primary.main, 0.5),
        },
        '*::-webkit-scrollbar-thumb:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.7),
        },

        '*::-webkit-scrollbar-thumb:active': {
          backgroundColor: alpha(theme.palette.primary.main, 0.9),
        },
        html: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch',
        },
        body: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
        },
        '#__next': {
          width: '100%',
          height: '100%',
        },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
          },
        },
        img: {
          display: 'block',
          maxWidth: '100%',
        },
        ul: {
          margin: 0,
          padding: 0,
        },
      })}
    />
  );

  return inputGlobalStyles;
}
