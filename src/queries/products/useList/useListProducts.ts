import type { IPaginatedResponse } from '@/shared/interfaces/IPaginate';
import type { IProduct } from '@/shared/interfaces/IProduct';
import { useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { listProductsQueryFn } from './listProductsQueryFn';
import type { useListProductsParams } from './type';

type QueryError = AxiosError;
type QueryFnData = IPaginatedResponse<IProduct>;
type QueryKeyType = [string, useListProductsParams];
type QueryOptions = UseQueryOptions<QueryFnData, QueryError, QueryFnData, QueryKeyType>;
type useListProductsProps = {
  params: useListProductsParams;
  options?: QueryOptions;
};
export const useListProducts = ({ params, options }: useListProductsProps) => {
  const queryKey: QueryKeyType = ['products', params];
  const queryClient = useQueryClient();

  return useQuery<QueryFnData, QueryError, QueryFnData, QueryKeyType>({
    queryKey,
    queryFn: () => listProductsQueryFn(params),
    throwOnError: () => false,
    initialData: () => queryClient.getQueryData(queryKey),
    ...options,
  });
};
