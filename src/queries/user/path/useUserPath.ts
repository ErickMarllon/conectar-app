import { handleError } from '@/errors/handleError';
import type { IUserSchema } from '@/schemas/user-schema';
import type { IUserAccountGeneral } from '@/shared/interfaces/IUser';
import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError, AxiosResponse } from 'axios';
import { userPathMutationFn } from './userPathMutationFn';
import { useAuthStore } from '@/stores/userAuth.store';

type MutationError = AxiosError;
type MutationData = AxiosResponse<IUserAccountGeneral>;
export type MutationVars = Partial<IUserSchema>;
type MutationOptions = UseMutationOptions<MutationData, MutationError, MutationVars>;

export const useUserPath = (options?: MutationOptions) => {
  const { setUser, user: userStore } = useAuthStore();

  const queryClient = useQueryClient();
  const key = ['user'];

  return useMutation<MutationData, MutationError, MutationVars>({
    mutationKey: key,
    mutationFn: (user) => userPathMutationFn(user),
    onError: (error) => handleError({ error }),
    onSuccess: ({ data }) => {
      if (data.id === userStore?.id) setUser(data);
      queryClient.invalidateQueries({ queryKey: key });
    },
    ...options,
  });
};
