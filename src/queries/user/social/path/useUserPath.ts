import { handleError } from '@/errors/handleError';
import type { IUserSocialSchema } from '@/schemas/social-schema';
import type { IUserSocialLink } from '@/shared/interfaces/IUser';
import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError, AxiosResponse } from 'axios';
import { queryFn } from './queryFn';

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
      queryClient.invalidateQueries({
        queryKey: ['user-social', userId ?? ''],
      });
    },
    ...options,
  });
};
