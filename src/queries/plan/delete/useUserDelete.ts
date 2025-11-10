import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError, AxiosResponse } from 'axios';
import { userDeleteMutationFn } from './userDeleteMutationFn';
import { handleError } from '@/errors/handleError';

type MutationError = AxiosError;
type MutationData = AxiosResponse<void>;
export type MutationVars = string | string[];
type MutationOptions = UseMutationOptions<MutationData, MutationError, MutationVars>;

export const useUserDelete = (options?: MutationOptions) => {
  const queryClient = useQueryClient();
  const key = ['user'];

  return useMutation<MutationData, MutationError, MutationVars>({
    mutationKey: key,
    mutationFn: (id) => userDeleteMutationFn(id),
    onError: (error) => handleError({ error }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
    ...options,
  });
};
