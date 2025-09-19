import { handleError } from '@/errors/handleError';
import type { IUserSchema } from '@/schemas/user-schema';
import type { IUserAccountGeneral } from '@/shared/interfaces/IUser';
import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError, AxiosResponse } from 'axios';
import { userCreateMutationFn } from './userCreateMutationFn';

type MutationError = AxiosError;
type MutationData = AxiosResponse<IUserAccountGeneral>;
type MutationVars = Partial<IUserSchema>;
type MutationOptions = UseMutationOptions<MutationData, MutationError, MutationVars>;

export const useUserCreate = (options?: MutationOptions) => {
  const queryClient = useQueryClient();
  const key = ['user'];

  return useMutation<MutationData, MutationError, MutationVars>({
    mutationKey: key,
    mutationFn: (user) => userCreateMutationFn(user),
    onError: (error) => handleError({ error }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
    ...options,
  });
};
