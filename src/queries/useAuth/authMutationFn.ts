import type { ISignIn } from '@/schemas/sign-in.schema';
import type { ISignUp } from '@/schemas/sign-up.schema';
import type { IUserAuth } from '@/shared/interfaces/IUser';
import type { AxiosResponse } from 'axios';
import { AuthActionType } from './types/IUseAuthTypes';
import { AuthService } from '@/services/authService';

const authMutationFn = async (
  type: AuthActionType,
  Data?: ISignIn | ISignUp,
): Promise<AxiosResponse<IUserAuth>> => {
  if (AuthActionType.SIGNIN === type && Data) {
    return AuthService.login(Data);
  }
  return AuthService.register(Data as ISignUp);
};

export { authMutationFn };
