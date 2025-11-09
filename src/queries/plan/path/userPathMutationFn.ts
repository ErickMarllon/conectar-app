import type { IUserSchema } from '@/schemas/user-schema';
import { UserService } from '@/services/user';
import type { IUserAccountGeneral } from '@/shared/interfaces/IUser';
import type { AxiosResponse } from 'axios';

export const userPathMutationFn = async (
  user: Partial<IUserSchema>,
): Promise<AxiosResponse<IUserAccountGeneral>> => {
  return UserService.userPath(user);
};
