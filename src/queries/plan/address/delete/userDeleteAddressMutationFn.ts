import type { AxiosResponse } from 'axios';
import { UserService } from '@/services/user';

export const userDeleteAddressMutationFn = async (
  user_id: string,
): Promise<AxiosResponse<void>> => {
  return UserService.deleteAddress(user_id);
};
