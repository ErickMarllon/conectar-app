import type { IUserProfile } from '@/shared/interfaces/IUser';
import { useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { userProfileQueryFn } from './userProfileQueryFn';

type QueryError = AxiosError;
type QueryFnData = IUserProfile;
type QueryKeyType = [string, string];
type QueryOptions = UseQueryOptions<QueryFnData, QueryError, QueryFnData, QueryKeyType>;
type UseUserProfile = {
  userId?: string;
  options?: QueryOptions;
};
export const useUserProfile = ({ userId, options }: UseUserProfile) => {
  const queryKey: QueryKeyType = ['user', userId ?? ''];
  const queryClient = useQueryClient();

  return useQuery<QueryFnData, QueryError, QueryFnData, QueryKeyType>({
    queryKey,
    queryFn: () => userProfileQueryFn(userId),
    throwOnError: () => false,
    initialData: () => queryClient.getQueryData(queryKey),
    ...options,
  });
};
