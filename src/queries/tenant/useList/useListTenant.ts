import { useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import type { IFilterEnterpriseGeneric } from '@/shared/interfaces/IFilter';
import type { IPaginatedResponse } from '@/shared/interfaces/IPaginate';
import type { ITenantAccountGeneral } from '@/shared/interfaces/ITenant';
import { queryFn } from './queryFn';

type QueryError = AxiosError;
type QueryFnData = IPaginatedResponse<ITenantAccountGeneral>;
type QueryKeyType = [string, Partial<IFilterEnterpriseGeneric>];
type QueryOptions = UseQueryOptions<QueryFnData, QueryError, QueryFnData, QueryKeyType>;

type useListProductsProps = {
  params: IFilterEnterpriseGeneric;
  options?: QueryOptions;
};
export const useListTenant = ({ params, options }: useListProductsProps) => {
  const queryKey: QueryKeyType = ['tenant', params];
  const queryClient = useQueryClient();
  return useQuery<QueryFnData, QueryError, QueryFnData, QueryKeyType>({
    queryKey,
    queryFn: () => queryFn(params),
    initialData: () => queryClient.getQueryData(queryKey),
    ...options,
  });
};
