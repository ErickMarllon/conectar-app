import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { IUserAuth } from '@/shared/interfaces/IUser';
import type { AxiosError, AxiosResponse } from 'axios';
import { mutationFn } from './mutationFn';
import { handleError } from '@/errors/handleError';
import { useAuthStore } from '@/stores/userAuth.store';

const use0Auth = () => {
  const { setUser } = useAuthStore();

  const queryClient = useQueryClient();
  const key = ['0auth'];
  return useMutation<AxiosResponse<IUserAuth>, AxiosError, string>({
    mutationKey: [key],
    mutationFn: (code) => mutationFn(code),
    onError: (error) => handleError({ error }),
    onSuccess: (response) => {
      setUser(response.data ?? null);
      queryClient.invalidateQueries({ queryKey: key });
    },
    onSettled: () => {},
  });
};

export { use0Auth };
