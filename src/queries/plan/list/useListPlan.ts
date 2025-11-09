import type { IPaginatedResponse } from '@/shared/interfaces/IPaginate';
import { useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { queryFn } from './queryFn';
import type { IList } from './type';
import type { IPlan } from '@/shared/interfaces/IPlan';

type QueryError = AxiosError;
type QueryFnData = IPaginatedResponse<IPlan>;
type QueryKeyType = [string, IList];
type QueryOptions = UseQueryOptions<QueryFnData, QueryError, QueryFnData, QueryKeyType> & {
  suspense?: boolean;
};

type useListPlanProps = {
  params: IList;
  options?: QueryOptions;
};

export const useListPlan = ({ params, options }: useListPlanProps = {} as useListPlanProps) => {
  const queryKey: QueryKeyType = ['plan', params];
  // const queryClient = useQueryClient();
  return useQuery<QueryFnData, QueryError, QueryFnData, QueryKeyType>({
    queryKey,
    queryFn: () => queryFn(params),
    // throwOnError: () => false,
    // initialData: () => queryClient.getQueryData(queryKey),
    ...options,
  });
};
