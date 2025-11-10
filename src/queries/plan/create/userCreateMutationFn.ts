import type { IUserSchema } from '@/schemas/user-schema';
import type { IUserAccountGeneral } from '@/shared/interfaces/IUser';
import type { AxiosResponse } from 'axios';
import { UserService } from '@/services/user';

export const userCreateMutationFn = async (
  user: Partial<IUserSchema>,
): Promise<AxiosResponse<IUserAccountGeneral>> => {
  return UserService.create(user);
};
