import type { IProduct } from '@/shared/interfaces/IProduct';
import { useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { productByQueryFn } from './productByQueryFn';

type QueryError = AxiosError;
type QueryFnData = IProduct;
type QueryKeyType = [string, string];
type UseUsersOptions = UseQueryOptions<QueryFnData, QueryError, QueryFnData, QueryKeyType>;

export const usePorductBy = (id?: string | null, options?: UseUsersOptions) => {
  const queryKey: QueryKeyType = ['product', id ?? ''];
  const queryClient = useQueryClient();

  return useQuery<QueryFnData, QueryError, QueryFnData, QueryKeyType>({
    queryKey,
    queryFn: () => productByQueryFn(id!),
    throwOnError: () => false,
    initialData: () => queryClient.getQueryData(queryKey),
    ...options,
    enabled: !!id,
  });
};
