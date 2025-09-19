import type { IUserAccountGeneral } from '@/shared/interfaces/IUser';
import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError, AxiosResponse } from 'axios';
import { handleError } from '@/errors/handleError';
import { userPathAddressMutationFn } from './userPathAddressMutationFn';
import type { IUserAddress } from '@/schemas/address-user-schema';

type MutationError = AxiosError;
type MutationData = AxiosResponse<IUserAccountGeneral>;
type MutationVars = Partial<IUserAddress>;
type MutationOptions = UseMutationOptions<MutationData, MutationError, MutationVars>;
type UseMutation = {
  userId?: string;
  options?: MutationOptions;
};
export const useUserPathAddress = ({ userId, options }: UseMutation = {}) => {
  const queryClient = useQueryClient();
  const key = ['user', userId ?? ''];

  return useMutation<MutationData, MutationError, MutationVars>({
    mutationKey: key,
    mutationFn: (data) => userPathAddressMutationFn(data),
    onError: (error) => handleError({ error }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
    ...options,
  });
};
