import { useQuery } from '@tanstack/react-query';
import type { IUser } from '@/shared/interfaces/IUser';
import type { UseListParams } from './type';
import type { IPaginatedResponse } from '@/shared/interfaces/IPaginate';
import { UsersService } from '@/services/users';

export const useUsers = ({ email, order, sort, role, search, page, limit }: UseListParams) => {
  return useQuery<IPaginatedResponse<IUser>>({
    queryKey: ['users', email, order, sort, role, search, page, limit],
    queryFn: async () => {
      const res = await UsersService.list(order, sort, role, search, {
        page,
        limit,
      });
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
