export const content = ['./src/**/*.{js,ts,jsx,tsx}'];
export const theme = {
  extend: {
    keyframes: {
      'spinner-leaf-fade': {
        '0%, 39%, 100%': { opacity: '0.25' },
        '40%': { opacity: '1' },
      },
    },
    animation: {
      'spinner-leaf-fade': 'spinner-leaf-fade 1.2s linear infinite',
    },
  },
};
export const plugins = [require('tailwindcss-animated')];
