import { type IAddressPayloadSchema } from '@/schemas/address-payload-schema';
import { UserService } from '@/services/user';
import type { IUserAccountGeneral } from '@/shared/interfaces/IUser';
import type { AxiosResponse } from 'axios';

export const userCreateAddressMutationFn = async (
  user: Partial<IAddressPayloadSchema>,
): Promise<AxiosResponse<IUserAccountGeneral>> => {
  return UserService.newAddress(user);
};
