import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authMutationFn } from './authMutationFn';
import type { IUserAuth } from '@/shared/interfaces/IUser';
import { AxiosError, type AxiosResponse } from 'axios';
import type { UseAuthTypeParams } from './types/IUseAuthTypes';
import { handleError } from '@/errors/handleError';
import { useAuthStore } from '@/stores/userAuth.store';
import type { ISignUp } from '@/schemas/sign-up.schema';
import type { ISignIn } from '@/schemas/sign-in.schema';

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
