import { handleError } from '@/errors/handleError';
import { TenantService } from '@/services/tenant';
import type { IFilterGeneric } from '@/shared/interfaces/IFilter';
import type { IPaginatedResponse } from '@/shared/interfaces/IPaginate';
import type { IUserAccountGeneral } from '@/shared/interfaces/IUser';
import { AxiosError } from 'axios';

export const queryFn = async (
  params: Partial<IFilterGeneric>,
): Promise<IPaginatedResponse<IUserAccountGeneral>> => {
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
