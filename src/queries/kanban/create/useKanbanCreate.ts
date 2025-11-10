import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import type { IKanbanBoard, IKanbanCommonParams } from '@/shared/interfaces/IKanban';
import type { AxiosError, AxiosResponse } from 'axios';
import { createColumnMutationFn } from './createColumnMutationFn';
import { handleError } from '@/errors/handleError';

type MutationError = AxiosError;
type MutationData = AxiosResponse<IKanbanBoard>;
type MutationVars = IKanbanCommonParams;
type MutationOptions = UseMutationOptions<MutationData, MutationError, MutationVars>;

export const useKanbanCreate = (slug?: string, options?: MutationOptions) => {
  const queryClient = useQueryClient();
  const key = ['kanban', slug];

  return useMutation<MutationData, MutationError, MutationVars>({
    mutationKey: key,
    mutationFn: ({ slug, columnId, data }) => createColumnMutationFn({ slug, columnId, data }),
    onError: (error) => handleError({ error }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
    ...options,
  });
};
