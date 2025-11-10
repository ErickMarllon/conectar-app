import type { ITenantSchema } from '@/schemas/tenant-schema';
import type { ITenantAccountGeneral } from '@/shared/interfaces/ITenant';
import type { AxiosResponse } from 'axios';
import { TenantService } from '@/services/tenant';

export const mutationFn = async (
  data: Partial<ITenantSchema>,
): Promise<AxiosResponse<ITenantAccountGeneral>> => {
  return TenantService.path(data);
};
