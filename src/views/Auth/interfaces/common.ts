export interface ISocialLogin {
  apple: string;
  google: string;
  meta: string;
}

export interface ITerms {
  prefix: string;
  tos: string;
  and: string;
  privacy: string;
}

export interface IFields {
  name: string;
  label: string;
  placeholder?: string;
  type: 'email' | 'password' | 'text';
  required?: boolean;
  forgotPassword?: {
    label: string;
    href?: string;
  };
}
export interface IFooter {
  message: string;
  link: string;
  redirectTo: string;
}
export interface IAccessData {
  title: string;
  subtitle: string;
  fields: IFields[];
  AccessButtonText: string;
  footer: IFooter;
}
