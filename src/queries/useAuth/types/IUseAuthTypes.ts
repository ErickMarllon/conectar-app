export enum AuthActionType {
  SIGNIN = 'SIGNIN',
  SIGNUP = 'SIGNUP',
}

interface UseAuthTypeParams {
  type: AuthActionType;
}

export type { UseAuthTypeParams };
