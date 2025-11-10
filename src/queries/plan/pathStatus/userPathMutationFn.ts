import type { IUserAccountGeneral } from '@/shared/interfaces/IUser';
import type { AxiosResponse } from 'axios';
import { UserService } from '@/services/user';

export const userPathStatusMutationFn = async (
  id: string,
): Promise<AxiosResponse<IUserAccountGeneral>> => {
  return UserService.userPathStatus(id);
};
