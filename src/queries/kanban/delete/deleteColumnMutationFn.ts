import type { IKanbanDeleteParams } from '@/shared/interfaces/IKanban';
import type { AxiosResponse } from 'axios';
import { KanbanService } from '@/services/kanban/kanbanService';

export const deleteColumnMutationFn = async ({
  slug,
  cardId,
  columnId,
}: IKanbanDeleteParams): Promise<AxiosResponse<void>> => {
  return await KanbanService.delete({ slug, cardId, columnId });
};
