import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { IUserAccountGeneral } from '@/shared/interfaces/IUser';
import type { AxiosError, AxiosResponse } from 'axios';
import { userPathAddressMutationFn } from './userPathAddressMutationFn';
import { handleError } from '@/errors/handleError';
import { type IAddressPayloadSchema } from '@/schemas/address-payload-schema';

type MutationError = AxiosError;
type MutationData = AxiosResponse<IUserAccountGeneral>;
type MutationVars = Partial<IAddressPayloadSchema>;
type MutationOptions = UseMutationOptions<MutationData, MutationError, MutationVars>;
type UseMutation = {
  user_id?: string;
  options?: MutationOptions;
};
export const useUserPathAddress = ({ user_id, options }: UseMutation = {}) => {
  const queryClient = useQueryClient();
  const key = ['user', user_id ?? ''];

  return useMutation<MutationData, MutationError, MutationVars>({
    mutationKey: key,
    mutationFn: (data) => userPathAddressMutationFn(data),
    onError: (error) => handleError({ error }),
    onSuccess: (_, variables) => {
      const user_id = variables;
      const message = 'Update success!';
      toast.success(message, { containerId: message });
      queryClient.invalidateQueries({ queryKey: ['user', user_id ?? ''] });
    },
    ...options,
  });
};
