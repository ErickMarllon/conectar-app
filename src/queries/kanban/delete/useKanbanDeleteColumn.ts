import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError, AxiosResponse } from 'axios';
import { handleError } from '@/errors/handleError';
import { deleteColumnMutationFn } from './deleteColumnMutationFn';
import type { IKanbanDeleteParams } from '@/shared/interfaces/IKanban';

type MutationData = AxiosResponse<void>;
type MutationError = AxiosError;
type MutationVars = IKanbanDeleteParams;
type MutationOptions = UseMutationOptions<MutationData, MutationError, MutationVars>;

const useKanbanDeleteColumn = (slug?: string | null, options?: Partial<MutationOptions>) => {
  const mutationKey = ['kanban', slug ?? ''];
  const queryClient = useQueryClient();
  return useMutation<MutationData, MutationError, MutationVars>({
    mutationKey,
    mutationFn: ({ slug, cardId, columnId }) => deleteColumnMutationFn({ slug, cardId, columnId }),
    onError: (error) => handleError({ error }),
    onSuccess: (_data, variables) => {
      const key = ['kanban', variables.slug];
      queryClient.invalidateQueries({ queryKey: key });
    },
    ...options,
  });
};

export { useKanbanDeleteColumn };
