import { handleError } from '@/errors/handleError';
import { UserService } from '@/services/user';
import type { IUserProfile } from '@/shared/interfaces/IUser';
import { AxiosError } from 'axios';

export const userProfileQueryFn = async (userId?: string): Promise<IUserProfile> => {
  try {
    const response = await UserService.getUserProfile(userId);
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
