import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import type { IUserAccountGeneral } from '@/shared/interfaces/IUser';
import type { AxiosError, AxiosResponse } from 'axios';
import { userCreateAddressMutationFn } from './userCreateAddressMutationFn';
import { handleError } from '@/errors/handleError';
import { type IAddressPayloadSchema } from '@/schemas/address-payload-schema';

type MutationError = AxiosError;
type MutationData = AxiosResponse<IUserAccountGeneral>;
type MutationVars = Partial<IAddressPayloadSchema>;
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
