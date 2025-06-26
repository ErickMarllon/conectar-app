import { useQuery } from '@tanstack/react-query';
import type { IUser } from '@/shared/interfaces/IUser';
import { UserService } from '@/services/user';

export const useUserById = (userId?: string | null) => {
  return useQuery<IUser>({
    queryKey: ['user', userId],
    queryFn: async () => {
      const res = await UserService.userById(userId!);
      return res.data;
    },
    enabled: !!userId,
  });
};
