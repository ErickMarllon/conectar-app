import { UserService } from '@/services/user';
import type { AxiosResponse } from 'axios';

export const userDeleteAddressMutationFn = async (
  user_id: string,
): Promise<AxiosResponse<void>> => {
  return UserService.deleteAddress(user_id);
};
