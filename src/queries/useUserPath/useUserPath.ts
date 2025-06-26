import type { IUser } from '@/shared/interfaces/IUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError, AxiosResponse } from 'axios';
import { pathMutationFn } from './pathMutationFn';
import { handleError } from '@/shared/utils/handleError';
import { toast } from 'react-toastify';

export const useUserPath = () => {
  const queryClient = useQueryClient();
  const key = ['user'];

  return useMutation<AxiosResponse<IUser>, AxiosError, Partial<IUser>>({
    mutationKey: key,
    mutationFn: (user) => pathMutationFn(user),
    onError: (error) => handleError(error),
    onSuccess: (response) => {
      const res = response.data;
      toast.success(`sucesso ao atualizar usuário ${res.first_name}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
  });
};
