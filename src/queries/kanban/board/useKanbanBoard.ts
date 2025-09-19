import { useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { boardQueryFn } from './boardQueryFn';
import type { IKanbanBoard } from '@/shared/interfaces/IKanban';

type QueryError = AxiosError;
type QueryFnData = IKanbanBoard;
type QueryData = IKanbanBoard;
type MutationVars = [string, string];
type QueryOptions = UseQueryOptions<QueryFnData, QueryError, QueryData, MutationVars>;

type UseKanbanArgs = {
  slug?: string | null;
  options?: Partial<QueryOptions>;
};
export const useKanbanBoard = ({ slug, options }: UseKanbanArgs) => {
  const queryKey: MutationVars = ['kanban', slug ?? ''];
  const queryClient = useQueryClient();

  return useQuery<QueryFnData, QueryError, QueryData, MutationVars>({
    queryKey,
    queryFn: () => boardQueryFn(slug!),
    throwOnError: () => false,
    initialData: () => queryClient.getQueryData(queryKey),
    ...options,
  });
};
