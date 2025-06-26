import { useQuery } from '@tanstack/react-query';
import type { IUser } from '@/shared/interfaces/IUser';
import { AuthService } from '@/services/authService';

export const useMe = () => {
  return useQuery<IUser>({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await AuthService.getMe();
      return res.data;
    },
  });
};
