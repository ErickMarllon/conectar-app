import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authMutationFn } from './authMutationFn';
import type { IUserAuth } from '@/shared/interfaces/IUser';
import type { AxiosError, AxiosResponse } from 'axios';
import type { UseAuthTypeParams } from './types/IUseAuthTypes';
import type { ISignInDto } from '@/components/access-form/dto/sign-in.dto';
import type { ISignUpDto } from '@/components/access-form/dto/sign-up.dto';
import { useAuthContext } from '@/contexts/auth';
import { handleError } from '@/shared/utils/handleError';

export type AuthDto = ISignInDto | ISignUpDto;

const useAuthUser = ({ type }: UseAuthTypeParams) => {
  const { setUser } = useAuthContext();
  const queryClient = useQueryClient();
  const key = ['auth', type];
  return useMutation<AxiosResponse<IUserAuth>, AxiosError, ISignInDto | ISignUpDto>({
    mutationKey: [key],
    mutationFn: (data) => authMutationFn(type, data),
    onError: (error) => handleError(error),
    onSuccess: (response) => {
      setUser(response.data ?? null);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
  });
};

export { useAuthUser };
