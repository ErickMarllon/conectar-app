import { alpha, type Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Input(theme: Theme) {
  return {
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            '& svg': {
              color: theme.palette.text.disabled,
            },
          },
        },
        input: {
          '&::placeholder': {
            opacity: 1,
            color: theme.palette.text.disabled,
          },
          '&:-internal-autofill-selected': {
            // WebkitBoxShadow: `none !important `,
            // appearance: `none !important `,
            // backgroundColor: `transparent !important `,
            // AnimationName: 'mui-auto-fill-cancel',
            // transition: 'box-shadow 9999s ease-in-out 0s !important',
            // transition: 'box-shadow background-color 9999s ease-in-out 0s !important',
          },
          // transition: 'box-shadow background-color 9999s ease-in-out 0s !important',
          // WebkitBoxShadow: `none  !important `,
        },
      },
    },

    MuiInput: {
      styleOverrides: {
        underline: {
          '&:before': {
            borderBottomColor: alpha(theme.palette.grey[500], 0.56),
          },
          '&:after': {
            borderBottomColor: theme.palette.text.primary,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root.Mui-focused': {
            color: theme.palette.text.primary,
          },
          '& input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 1000px transparent inset !important',
            transition: 'background-color 9999s ease-in-out 0s',
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
          backgroundColor: alpha(theme.palette.grey[500], 0.08),
          '&:hover': {
            backgroundColor: alpha(theme.palette.grey[500], 0.16),
          },
          '&.Mui-focused': {
            backgroundColor: alpha(theme.palette.grey[500], 0.16),
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.action.disabledBackground,
          },
        },
        underline: {
          '&:before, :after': {
            display: 'none',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha(theme.palette.grey[500], 0.32),
          },

          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: 1,
              borderColor: theme.palette.text.primary,
            },
          },
          '&.Mui-disabled': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.action.disabledBackground,
            },
          },
        },
      },
    },
  };
}
