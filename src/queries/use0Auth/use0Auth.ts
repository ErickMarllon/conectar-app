import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { IUserAuth } from '@/shared/interfaces/IUser';
import type { AxiosError, AxiosResponse } from 'axios';
import { mutationFn } from './mutationFn';
import { useAuthContext } from '@/contexts/auth';
import { handleError } from '@/shared/utils/handleError';

const use0Auth = () => {
  const { setUser } = useAuthContext();
  const queryClient = useQueryClient();
  const key = ['0auth'];
  return useMutation<AxiosResponse<IUserAuth>, AxiosError, string>({
    mutationKey: [key],
    mutationFn: (code) => mutationFn(code),
    onError: (error) => handleError(error),
    onSuccess: (response) => {
      setUser(response.data ?? null);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
  });
};

export { use0Auth };
