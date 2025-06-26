import type { IAccessData } from '../interfaces/common';

export const signInMock: IAccessData = {
  title: 'Welcome back',
  subtitle: 'Login to your Acme Inc account',

  fields: [
    {
      name: 'email',
      label: 'E-mail',
      type: 'email',
      placeholder: 'example@example.com',
      required: true,
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: '••••••••',
      required: true,
      forgotPassword: {
        label: 'Forgot Password',
      },
    },
  ],

  AccessButtonText: 'Login',

  footer: {
    message: "Don't have an account?",
    link: 'Sign up',
    redirectTo: '/signup',
  },
};
