import type { ITenantSchema } from '@/schemas/tenant-schema';
import { TenantService } from '@/services/tenant';
import type { ITenantAccountGeneral } from '@/shared/interfaces/ITenant';
import type { AxiosResponse } from 'axios';

export const mutationFn = async (
  data: Partial<ITenantSchema>,
): Promise<AxiosResponse<ITenantAccountGeneral>> => {
  return TenantService.path(data);
};
