import type { IUserAccountGeneral } from '@/shared/interfaces/IUser';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { BaseQueryOptions } from '../type';
import { userByIdQueryFn } from './userByIdQueryFn';
import type { AxiosError } from 'axios';

type QueryError = AxiosError;
type QueryFnData = IUserAccountGeneral;
type QueryKeyType = [string, string];
type UseUsersOptions = BaseQueryOptions<QueryFnData, QueryKeyType>;

export const useUserById = (userId?: string | null, options?: UseUsersOptions) => {
  const queryKey: QueryKeyType = ['user', userId ?? ''];
  const queryClient = useQueryClient();

  return useQuery<QueryFnData, QueryError, QueryFnData, QueryKeyType>({
    queryKey,
    queryFn: () => userByIdQueryFn(userId!),
    throwOnError: () => false,
    initialData: () => queryClient.getQueryData(queryKey),
    ...options,
    enabled: !!userId,
  });
};
