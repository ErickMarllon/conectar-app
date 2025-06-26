import type { ISocialLogin, ITerms } from '../interfaces/common';

export const socialLogin: ISocialLogin = {
  apple: 'Login with Apple',
  google: 'Login with Google',
  meta: 'Login with Meta',
};

export const terms: ITerms = {
  prefix: 'By clicking continue, you agree to our',
  tos: 'Terms of Service',
  and: 'and',
  privacy: 'Privacy Policy',
};

export const orContinue: string = 'Or continue with';
