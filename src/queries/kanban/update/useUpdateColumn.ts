import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import type { IKanbanBoard, IKanbanCommonParams } from '@/shared/interfaces/IKanban';
import type { AxiosError, AxiosResponse } from 'axios';
import { updateColumnMutationFn } from './updateColumnMutationFn';
import { handleError } from '@/errors/handleError';

type MutationError = AxiosError;
type MutationData = AxiosResponse<IKanbanBoard>;
export type MutationVars = IKanbanCommonParams;
type MutationOptions = UseMutationOptions<MutationData, MutationError, MutationVars>;

export const useKanbanUpdateColumn = (slug?: string, options?: MutationOptions) => {
  const queryClient = useQueryClient();
  const key = ['kanban', slug];

  return useMutation<MutationData, MutationError, MutationVars>({
    mutationKey: key,
    mutationFn: ({ slug, columnId, data }) => updateColumnMutationFn({ data, slug, columnId }),
    onError: (error) => handleError({ error }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
    ...options,
  });
};
