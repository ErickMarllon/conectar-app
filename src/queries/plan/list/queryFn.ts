import { AxiosError } from 'axios';
import type { IList } from './type';
import type { IPaginatedResponse } from '@/shared/interfaces/IPaginate';
import type { IPlan } from '@/shared/interfaces/IPlan';
import { handleError } from '@/errors/handleError';
import { PlanService } from '@/services/plan/planService';

export const queryFn = async (params: IList): Promise<IPaginatedResponse<IPlan>> => {
  try {
    const response = await PlanService.list(params);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    handleError({
      error: axiosError,
      customMessage: 'Ocorreu um Erro ao listar usuários',
      returnBoolean: false,
    });

    throw axiosError;
  }
};
