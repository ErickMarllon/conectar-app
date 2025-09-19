import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError, AxiosResponse } from 'axios';
import { handleError } from '@/errors/handleError';
import type { IUserAddress } from '@/schemas/address-user-schema';
import { userCreateAddressMutationFn } from './userCreateAddressMutationFn';
import type { IUserAccountGeneral } from '@/shared/interfaces/IUser';

type MutationError = AxiosError;
type MutationData = AxiosResponse<IUserAccountGeneral>;
type MutationVars = Partial<IUserAddress>;
type MutationOptions = UseMutationOptions<MutationData, MutationError, MutationVars>;

export const useUserCreateAdress = (options?: MutationOptions) => {
  const queryClient = useQueryClient();
  const key = ['user'];

  return useMutation<MutationData, MutationError, MutationVars>({
    mutationKey: key,
    mutationFn: (user) => userCreateAddressMutationFn(user),
    onError: (error) => handleError({ error }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
    ...options,
  });
};
