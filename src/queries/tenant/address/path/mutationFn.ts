import { type IAddressPayloadSchema } from '@/schemas/address-payload-schema';
import { TenantService } from '@/services/tenant';
import type { ITenantAccountGeneral } from '@/shared/interfaces/ITenant';
import type { AxiosResponse } from 'axios';

const mutationFn = async (
  data: Partial<IAddressPayloadSchema>,
): Promise<AxiosResponse<ITenantAccountGeneral>> => {
  return TenantService.patchAddress(data);
};

export { mutationFn };
