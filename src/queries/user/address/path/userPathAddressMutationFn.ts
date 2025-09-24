import { type IAddressPayloadSchema } from '@/schemas/address-payload-schema';
import { UserService } from '@/services/user';
import type { IUserAccountGeneral } from '@/shared/interfaces/IUser';
import type { AxiosResponse } from 'axios';

const userPathAddressMutationFn = async (
  data: Partial<IAddressPayloadSchema>,
): Promise<AxiosResponse<IUserAccountGeneral>> => {
  return UserService.patchAddress(data);
};

export { userPathAddressMutationFn };
