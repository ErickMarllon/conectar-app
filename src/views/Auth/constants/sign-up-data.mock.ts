import type { IAccessData } from '../interfaces/common';

export const signUpMock: IAccessData = {
  title: 'Create an account',
  subtitle: 'Join Conéctar today',

  fields: [
    {
      name: 'email',
      label: 'E-mail',
      type: 'email',
      placeholder: 'johndoe@example.com',
      required: true,
    },
    {
      name: 'first_name',
      label: 'First Name',
      type: 'text',
      placeholder: 'John Doe',
      required: true,
    },
    {
      name: 'last_name',
      label: 'Last Name',
      type: 'text',
      placeholder: 'John Doe',
      required: true,
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Create a password',
      required: true,
    },
  ],

  AccessButtonText: 'Register',

  footer: {
    message: 'Already have an account?',
    link: 'Login',
    redirectTo: '/',
  },
};
