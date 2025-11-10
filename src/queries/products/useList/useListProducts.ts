import { useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import type { useListProductsParams } from './type';
import type { IPaginatedResponse } from '@/shared/interfaces/IPaginate';
import type { IProduct } from '@/shared/interfaces/IProduct';
import { listProductsQueryFn } from './listProductsQueryFn';

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
