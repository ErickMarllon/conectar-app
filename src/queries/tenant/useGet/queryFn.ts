import { handleError } from '@/errors/handleError';
import { TenantService } from '@/services/tenant';
import type { ITenantAccountGeneral } from '@/shared/interfaces/ITenant';
import { AxiosError } from 'axios';

export const queryFn = async (tenantId?: string): Promise<ITenantAccountGeneral> => {
  try {
    const response = await TenantService.getBy(tenantId);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    handleError({
      error: axiosError,
      customMessage: 'Ocorreu um Erro ao listar usuário ',
      returnBoolean: false,
    });

    throw axiosError;
  }
};
