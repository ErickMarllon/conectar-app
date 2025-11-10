import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { IChangePassword } from '@/schemas/change-password-schema';
import type { IUserAccountGeneral } from '@/shared/interfaces/IUser';
import type { AxiosError, AxiosResponse } from 'axios';
import { userPathPasswordMutationFn } from './userPathMutationFn';
import { handleError } from '@/errors/handleError';

type MutationError = AxiosError;
type MutationData = AxiosResponse<IUserAccountGeneral>;
export type MutationVars = IChangePassword;
type MutationOptions = UseMutationOptions<MutationData, MutationError, MutationVars>;

export const useUserPathPassword = (options?: MutationOptions) => {
  const queryClient = useQueryClient();
  const key = ['user'];

  return useMutation<MutationData, MutationError, MutationVars>({
    mutationKey: key,
    mutationFn: (data) => userPathPasswordMutationFn(data),
    onError: (error) => handleError({ error }),
    onSuccess: (_, variables) => {
      const userId = variables.user_id;
      const message = 'Update success!';
      toast.success(message, { containerId: message });
      queryClient.invalidateQueries({ queryKey: ['user', userId ?? ''] });
    },
    ...options,
  });
};
