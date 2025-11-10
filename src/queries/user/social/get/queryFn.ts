import { AxiosError } from 'axios';
import type { IUserSocialLink } from '@/shared/interfaces/IUser';
import { handleError } from '@/errors/handleError';
import { UserService } from '@/services/user';

export const queryFn = async (userId: string): Promise<IUserSocialLink> => {
  try {
    const response = await UserService.socialByUserId(userId);
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
