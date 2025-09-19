import { handleError } from '@/errors/handleError';
import { UserService } from '@/services/user';
import type { IUserAccountGeneral } from '@/shared/interfaces/IUser';
import { AxiosError } from 'axios';

export const userByIdQueryFn = async (userId: string): Promise<IUserAccountGeneral> => {
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
