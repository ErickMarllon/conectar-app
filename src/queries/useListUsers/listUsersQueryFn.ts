import { handleError } from '@/errors/handleError';
import { UsersService } from '@/services/users';
import type { IFilterGeneric } from '@/shared/interfaces/IFilter';
import type { IPaginatedResponse } from '@/shared/interfaces/IPaginate';
import type { IUserAccountGeneral } from '@/shared/interfaces/IUser';
import { AxiosError } from 'axios';

export const listUsersQueryFn = async (
  params: Partial<IFilterGeneric>,
): Promise<IPaginatedResponse<IUserAccountGeneral>> => {
  try {
    const response = await UsersService.list(params);
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
