import { api } from '@/http/api';
import type { IFilterGeneric } from '@/shared/interfaces/IFilter';
import type { IPaginatedResponse } from '@/shared/interfaces/IPaginate';
import type { IUserAccountGeneral } from '@/shared/interfaces/IUser';
import type { AxiosResponse } from 'axios';

class TenantService {
  public static async list(
    params: Partial<IFilterGeneric>,
  ): Promise<AxiosResponse<IPaginatedResponse<IUserAccountGeneral>>> {
    const { limit, orderBy, page, filters, sortBy, cursor, searchTerm } = params;
    const serializedSort =
      Array.isArray(sortBy) && sortBy.length > 0 && sortBy.every((s) => s.property && s.order)
        ? JSON.stringify(sortBy)
        : undefined;

    return await api.get<IPaginatedResponse<any>>('tenant/list', {
      params: {
        searchTerm,
        ...filters,
      },
      headers: {
        'rest-mode': 'offset',
        'rest-order': orderBy,
        'rest-sort': serializedSort,
        'rest-offset': page !== 0 ? page : 1,
        'rest-limit': limit,
        'rest-cursor': cursor,
      },
    });
  }
}

export { TenantService };
