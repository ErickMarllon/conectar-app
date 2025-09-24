import { api } from '@/http/api';
import { type IAddressPayloadSchema } from '@/schemas/address-payload-schema';
import type { ITenantSchema } from '@/schemas/tenant-schema';
import type { IFilterEnterpriseGeneric } from '@/shared/interfaces/IFilter';
import type { IPaginatedResponse } from '@/shared/interfaces/IPaginate';
import type { ITenantAccountGeneral } from '@/shared/interfaces/ITenant';
import type { AxiosResponse } from 'axios';

class TenantService {
  public static async list(
    params: Partial<IFilterEnterpriseGeneric>,
  ): Promise<AxiosResponse<IPaginatedResponse<ITenantAccountGeneral>>> {
    const { limit, orderBy, page, filters, sortBy, sort, cursor, searchTerm } = params;
    const serializedSort =
      Array.isArray(sort) && sort.length > 0 && sort.every((s) => s.property && s.order)
        ? JSON.stringify(sort)
        : undefined;

    return await api.get('tenant/list', {
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

  public static async getBy(id?: string): Promise<AxiosResponse<ITenantAccountGeneral>> {
    return await api.get(`tenant${id ? `/${id}` : ''}`);
  }

  public static async path(
    data: Partial<ITenantSchema>,
  ): Promise<AxiosResponse<ITenantAccountGeneral>> {
    const { id, ...formData } = data;
    return await api.patch(`tenant/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  public static async patchAddress(
    data: Partial<IAddressPayloadSchema>,
  ): Promise<AxiosResponse<ITenantAccountGeneral>> {
    const { tenant_id, address } = data;
    return await api.patch(`tenant/${tenant_id}/address`, address);
  }
}

export { TenantService };
