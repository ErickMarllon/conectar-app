import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { IUserSocialSchema } from '@/schemas/social-schema';
import type { IUserSocialLink } from '@/shared/interfaces/IUser';
import type { AxiosError, AxiosResponse } from 'axios';
import { queryFn } from './queryFn';
import { handleError } from '@/errors/handleError';

type MutationError = AxiosError;
type MutationData = AxiosResponse<IUserSocialLink>;
export type MutationVars = Partial<IUserSocialSchema>;
type MutationOptions = UseMutationOptions<MutationData, MutationError, MutationVars>;

export const useUserSocialPath = (options?: MutationOptions) => {
  const queryClient = useQueryClient();
  const key = ['user-social'];

  return useMutation<MutationData, MutationError, MutationVars>({
    mutationKey: key,
    mutationFn: (data) => queryFn(data),
    onError: (error) => handleError({ error }),
    onSuccess: (_, variable) => {
      const userId = variable.user_id;
      const message = 'Update success!';
      toast.success(message, { containerId: message });
      queryClient.invalidateQueries({
        queryKey: ['user-social', userId ?? ''],
      });
    },
    ...options,
  });
};
