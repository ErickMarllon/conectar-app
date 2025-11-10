import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { IUserSchema } from '@/schemas/user-schema';
import type { IUserAccountGeneral } from '@/shared/interfaces/IUser';
import type { AxiosError, AxiosResponse } from 'axios';
import { userCreateMutationFn } from './userCreateMutationFn';
import { handleError } from '@/errors/handleError';

type MutationError = AxiosError;
type MutationData = AxiosResponse<IUserAccountGeneral>;
type MutationVars = Partial<IUserSchema>;
type MutationOptions = UseMutationOptions<MutationData, MutationError, MutationVars>;

export const useUserCreate = (options?: MutationOptions) => {
  return useMutation<MutationData, MutationError, MutationVars>({
    mutationFn: (user) => userCreateMutationFn(user),
    onError: (error) =>
      handleError({
        error,
        customMessage: 'Create failed!',
      }),
    onSuccess: () => {
      const message = 'Create success!';
      toast.success(message, { containerId: message });
    },
    ...options,
  });
};
