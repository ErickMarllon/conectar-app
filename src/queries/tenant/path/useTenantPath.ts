import { handleError } from '@/errors/handleError';
import type { ITenantAccountGeneral } from '@/shared/interfaces/ITenant';
import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { mutationFn } from './userPathMutationFn';
import type { ITenantSchema } from '@/schemas/tenant-schema';

type MutationError = AxiosError;
type MutationData = AxiosResponse<ITenantAccountGeneral>;
export type MutationVars = Partial<ITenantSchema>;
type MutationOptions = UseMutationOptions<MutationData, MutationError, MutationVars>;

export const useTenantPath = (options?: MutationOptions) => {
  const queryClient = useQueryClient();
  const key = ['tenant'];

  return useMutation<MutationData, MutationError, MutationVars>({
    mutationKey: key,
    mutationFn: (data) => mutationFn(data),
    onError: (error) => handleError({ error, customMessage: 'Update failed!' }),
    onSuccess: () => {
      const message = 'Update success!';
      toast.success(message, { containerId: message });
      queryClient.invalidateQueries({ queryKey: ['tenant'] });
    },
    ...options,
  });
};
