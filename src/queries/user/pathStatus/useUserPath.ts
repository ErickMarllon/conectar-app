import { handleError } from '@/errors/handleError';
import type { IUserAccountGeneral } from '@/shared/interfaces/IUser';
import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError, AxiosResponse } from 'axios';
import { userPathStatusMutationFn } from './userPathMutationFn';

type MutationError = AxiosError;
type MutationData = AxiosResponse<IUserAccountGeneral>;
export type MutationVars = string;
type MutationOptions = UseMutationOptions<MutationData, MutationError, MutationVars>;

export const useUserPathStatus = (options?: MutationOptions) => {
  const queryClient = useQueryClient();
  const key = ['user'];

  return useMutation<MutationData, MutationError, MutationVars>({
    mutationKey: key,
    mutationFn: (id) => userPathStatusMutationFn(id),
    onError: (error) => handleError({ error }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
    ...options,
  });
};
