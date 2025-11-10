import { AxiosError } from 'axios';
import type { IFilterEnterpriseGeneric } from '@/shared/interfaces/IFilter';
import type { IPaginatedResponse } from '@/shared/interfaces/IPaginate';
import type { ITenantAccountGeneral } from '@/shared/interfaces/ITenant';
import { handleError } from '@/errors/handleError';
import { TenantService } from '@/services/tenant';

export const queryFn = async (
  params: Partial<IFilterEnterpriseGeneric>,
): Promise<IPaginatedResponse<ITenantAccountGeneral>> => {
  try {
    const response = await TenantService.list(params);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    handleError({
      error: axiosError,
      customMessage: 'Ocorreu um Erro ao listar Empresas',
      returnBoolean: false,
    });

    throw axiosError;
  }
};
