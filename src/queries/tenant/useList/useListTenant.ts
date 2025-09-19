import type { IFilterGeneric } from '@/shared/interfaces/IFilter';
import type { IPaginatedResponse } from '@/shared/interfaces/IPaginate';
import type { IUserAccountGeneral } from '@/shared/interfaces/IUser';
import { useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { queryFn } from './queryFn';

type QueryError = AxiosError;
type QueryFnData = IPaginatedResponse<IUserAccountGeneral>;
type QueryKeyType = [string, Partial<IFilterGeneric>];
type QueryOptions = UseQueryOptions<QueryFnData, QueryError, QueryFnData, QueryKeyType> & {
  suspense?: boolean;
};

type useListProductsProps = {
  params: Partial<IFilterGeneric>;
  options?: QueryOptions;
};
export const useListTenant = ({ params, options }: useListProductsProps) => {
  const queryKey: QueryKeyType = ['users', params];
  const queryClient = useQueryClient();
  return useQuery<QueryFnData, QueryError, QueryFnData, QueryKeyType>({
    queryKey,
    queryFn: () => queryFn(params),
    throwOnError: () => false,
    initialData: () => queryClient.getQueryData(queryKey),
    ...options,
  });
};
