import { UserService } from '@/services/user';
import type { IUserAccountGeneral } from '@/shared/interfaces/IUser';
import type { AxiosResponse } from 'axios';

export const userPathStatusMutationFn = async (
  id: string,
): Promise<AxiosResponse<IUserAccountGeneral>> => {
  return UserService.userPathStatus(id);
};
