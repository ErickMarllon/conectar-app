import { AxiosError } from 'axios';
import type { IUserAccountGeneral } from '@/shared/interfaces/IUser';
import { handleError } from '@/errors/handleError';
import { UserService } from '@/services/user';

export const userByIdQueryFn = async (userId?: string): Promise<IUserAccountGeneral> => {
  if (!userId) return {} as IUserAccountGeneral;
  try {
    const response = await UserService.userById(userId);
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
