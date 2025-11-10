import type { AxiosResponse } from 'axios';
import { UserService } from '@/services/user';

export const userDeleteMutationFn = async (id: string | string[]): Promise<AxiosResponse<void>> => {
  return UserService.userDelete(id);
};
