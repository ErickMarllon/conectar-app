import { useQuery } from '@tanstack/react-query';
import type { BaseQueryOptions } from '../../type';
import type { AxiosError } from 'axios';
import { queryFn } from './queryFn';
import type { ITenantAccountGeneral } from '@/shared/interfaces/ITenant';

type QueryError = AxiosError;
type QueryFnData = ITenantAccountGeneral;
type QueryKeyType = [string];
type UseUsersOptions = BaseQueryOptions<QueryFnData, QueryKeyType>;

export const useGetTenant = (_tenant?: string | null, options?: UseUsersOptions) => {
  const queryKey: QueryKeyType = ['tenant'];

  return useQuery<QueryFnData, QueryError, QueryFnData, QueryKeyType>({
    queryKey,
    queryFn: () => queryFn(),

    throwOnError: () => false,
    ...options,
  });
};
