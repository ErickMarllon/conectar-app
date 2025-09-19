import type { IChangePassword } from '@/schemas/change-password-schema';
import { AuthService } from '@/services/authService';
import type { IUserAccountGeneral } from '@/shared/interfaces/IUser';
import type { AxiosResponse } from 'axios';

export const userPathPasswordMutationFn = async (
  data: IChangePassword,
): Promise<AxiosResponse<IUserAccountGeneral>> => {
  return AuthService.userPathPassword(data);
};
