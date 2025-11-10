import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { ITenantAccountGeneral } from '@/shared/interfaces/ITenant';
import type { AxiosError, AxiosResponse } from 'axios';
import { mutationFn } from './mutationFn';
import { handleError } from '@/errors/handleError';
import { type IAddressPayloadSchema } from '@/schemas/address-payload-schema';

type MutationError = AxiosError;
type MutationData = AxiosResponse<ITenantAccountGeneral>;
type MutationVars = Partial<IAddressPayloadSchema>;
type MutationOptions = UseMutationOptions<MutationData, MutationError, MutationVars>;
type UseMutation = {
  tenant_id?: string;
  options?: MutationOptions;
};
export const useTenantPathAddress = ({ options }: UseMutation = {}) => {
  const queryClient = useQueryClient();
  const key = ['tenant'];

  return useMutation<MutationData, MutationError, MutationVars>({
    mutationKey: key,
    mutationFn: (data) => mutationFn(data),
    onError: (error) => handleError({ error }),
    onSuccess: (_, _variables) => {
      const message = 'Update success!';
      toast.success(message, { containerId: message });
      queryClient.invalidateQueries({ queryKey: ['tenant'] });
    },
    ...options,
  });
};
