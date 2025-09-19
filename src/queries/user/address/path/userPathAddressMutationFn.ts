import type { IUserAddress } from '@/schemas/address-user-schema';
import { UserService } from '@/services/user';
import type { IUserAccountGeneral } from '@/shared/interfaces/IUser';
import type { AxiosResponse } from 'axios';

const userPathAddressMutationFn = async (
  data: Partial<IUserAddress>,
): Promise<AxiosResponse<IUserAccountGeneral>> => {
  return UserService.patchAddress(data);
};

export { userPathAddressMutationFn };
