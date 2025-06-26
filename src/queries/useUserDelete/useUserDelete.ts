// hooks/mutations/useUserDelete.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { UserService } from '@/services/user';
import { handleError } from '@/shared/utils/handleError';
import { toast } from 'react-toastify';

export const useUserDelete = () => {
  const queryClient = useQueryClient();
  const key = ['user'];

  return useMutation<void, AxiosError, string>({
    mutationKey: key,
    mutationFn: (id) => UserService.userDelete(id),
    onError: (error) => {
      handleError(error);
    },
    onSuccess: () => {
      toast.success(`Usuário deletado com sucesso.`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
  });
};
