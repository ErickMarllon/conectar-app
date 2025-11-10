import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { IUserSchema } from '@/schemas/user-schema';
import type { IUserAccountGeneral } from '@/shared/interfaces/IUser';
import type { AxiosError, AxiosResponse } from 'axios';
import { userPathMutationFn } from './userPathMutationFn';
import { handleError } from '@/errors/handleError';
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
    onError: (error) => handleError({ error, customMessage: 'Update failed!' }),
    onSuccess: (data, variables) => {
      if (variables.id === userStore?.id) setUser(data.data);
      const userId = variables.id;
      const message = 'Update success!';
      toast.success(message, { containerId: message });
      queryClient.invalidateQueries({ queryKey: ['user', userId ?? ''] });
    },
    ...options,
  });
};
