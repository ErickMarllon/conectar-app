import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import type { UseAuthTypeParams } from './types/IUseAuthTypes';
import type { ISignIn } from '@/schemas/sign-in.schema';
import type { ISignUp } from '@/schemas/sign-up.schema';
import type { IUserAuth } from '@/shared/interfaces/IUser';
import { authMutationFn } from './authMutationFn';
import { handleError } from '@/errors/handleError';
import { useAuthStore } from '@/stores/userAuth.store';

export type AuthDto = ISignIn | ISignUp;

const useAuthUser = ({ type }: UseAuthTypeParams) => {
  const { setUser } = useAuthStore();
  const queryClient = useQueryClient();
  const key = ['auth', type];
  return useMutation<AxiosResponse<IUserAuth>, AxiosError, ISignIn | ISignUp>({
    mutationKey: [key],
    mutationFn: (data) => authMutationFn(type, data),
    onError: (error) => handleError({ error }),
    onSuccess: (response) => {
      setUser(response.data ?? null);
      queryClient.invalidateQueries({ queryKey: key });
    },
    onSettled: () => {},
  });
};

export { useAuthUser };
