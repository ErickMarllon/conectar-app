import type { IUserAccountGeneral } from '@/shared/interfaces/IUser';
import type { AxiosResponse } from 'axios';
import { type IAddressPayloadSchema } from '@/schemas/address-payload-schema';
import { UserService } from '@/services/user';

export const userCreateAddressMutationFn = async (
  user: Partial<IAddressPayloadSchema>,
): Promise<AxiosResponse<IUserAccountGeneral>> => {
  return UserService.newAddress(user);
};
