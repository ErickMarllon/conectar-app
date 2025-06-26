import { AuthService } from '@/services/authService';
import { AuthActionType } from './types/IUseAuthTypes';
import type { IUserAuth } from '@/shared/interfaces/IUser';
import type { AxiosResponse } from 'axios';
import type { ISignUpDto } from '@/components/access-form/dto/sign-up.dto';
import type { ISignInDto } from '@/components/access-form/dto/sign-in.dto';

const authMutationFn = async (
  type: AuthActionType,
  Data?: ISignInDto | ISignUpDto,
): Promise<AxiosResponse<IUserAuth>> => {
  if (AuthActionType.SIGNIN === type && Data) {
    return AuthService.login(Data);
  }

  return AuthService.register(Data as ISignUpDto);
};

export { authMutationFn };
