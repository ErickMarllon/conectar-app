import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError, AxiosResponse } from 'axios';
import { handleError } from '@/errors/handleError';
import type { IKanbanBoard, IKanbanCommonParams } from '@/shared/interfaces/IKanban';
import { createColumnMutationFn } from './createColumnMutationFn';

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
