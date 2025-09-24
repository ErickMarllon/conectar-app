import { api } from '@/http/api';
import type { IFilterGeneric } from '@/shared/interfaces/IFilter';
import type { IPaginatedResponse } from '@/shared/interfaces/IPaginate';
import type { IUserAccountGeneral } from '@/shared/interfaces/IUser';
import type { AxiosResponse } from 'axios';

class UsersService {
  public static async list(
    params: Partial<IFilterGeneric>,
  ): Promise<AxiosResponse<IPaginatedResponse<IUserAccountGeneral>>> {
    const { limit, orderBy, page, filters, sortBy, sort, cursor, searchTerm } = params;
    const serializedSort =
      Array.isArray(sort) && sort.length > 0 && sort.every((s) => s.property && s.order)
        ? JSON.stringify(sort)
        : undefined;

    return await api.get('user/list', {
      params: {
        searchTerm,
        ...filters,
      },
      headers: {
        'rest-mode': 'offset',
        'rest-order': orderBy?.toUpperCase() ?? undefined,
        'rest-sortBy': sortBy,
        'rest-sort': serializedSort,
        'rest-offset': page !== 0 ? page : 1,
        'rest-limit': limit,
        'rest-cursor': cursor,
      },
    });
  }
}

export { UsersService };
