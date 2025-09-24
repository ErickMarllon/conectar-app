import { handleError } from '@/errors/handleError';
import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError, AxiosResponse } from 'axios';
import { userDeleteAddressMutationFn } from './userDeleteAddressMutationFn';
import { toast } from 'react-toastify';

type MutationError = AxiosError;
type MutationData = AxiosResponse<void>;
export type MutationVars = string;
type MutationOptions = UseMutationOptions<MutationData, MutationError, MutationVars>;

export const useUserDeleteAddress = (options?: MutationOptions) => {
  const queryClient = useQueryClient();
  const key = ['user'];

  return useMutation<MutationData, MutationError, MutationVars>({
    mutationKey: key,
    mutationFn: (user_id) => userDeleteAddressMutationFn(user_id),
    onError: (error) => handleError({ error }),
    onSuccess: (_, variables) => {
      const userId = variables;
      const message = 'Delete success!';
      toast.success(message, { containerId: message });
      queryClient.invalidateQueries({ queryKey: ['user', userId ?? ''] });
    },
    ...options,
  });
};
