import { useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/react-query';
import type { IUserSocialLink } from '@/shared/interfaces/IUser';
import type { AxiosError } from 'axios';
import { queryFn } from './queryFn';

type QueryError = AxiosError;
type QueryFnData = IUserSocialLink;
type QueryKeyType = [string, string | null];
type UseUsersOptions = UseQueryOptions<QueryFnData, QueryError, QueryFnData, QueryKeyType>;

export const useSocialByUser = (
  isEnterprise?: boolean,
  userId?: string | null,
  options?: UseUsersOptions,
) => {
  const queryKey: QueryKeyType = ['user-social', userId ?? ''];
  const queryClient = useQueryClient();

  return useQuery<QueryFnData, QueryError, QueryFnData, QueryKeyType>({
    queryKey,
    queryFn: () => queryFn(userId!),
    throwOnError: () => false,
    initialData: () => queryClient.getQueryData(queryKey),
    ...options,
    enabled: !isEnterprise || !!userId,
  });
};
