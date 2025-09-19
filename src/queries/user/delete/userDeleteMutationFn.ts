import { UserService } from '@/services/user';
import type { AxiosResponse } from 'axios';

export const userDeleteMutationFn = async (id: string | string[]): Promise<AxiosResponse<void>> => {
  return UserService.userDelete(id);
};
