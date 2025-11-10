import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { IUserAccountGeneral } from '@/shared/interfaces/IUser';
import type { AxiosError, AxiosResponse } from 'axios';
import { userPathStatusMutationFn } from './userPathMutationFn';
import { handleError } from '@/errors/handleError';

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
    onError: (error) =>
      handleError({
        error,
        customMessage: 'Update failed!',
      }),
    onSuccess: (_, variables) => {
      const message = 'Update success!';
      toast.success(message, { containerId: message });

      const userId = variables;
      queryClient.invalidateQueries({ queryKey: ['user', userId ?? ''] });
    },
    ...options,
  });
};
