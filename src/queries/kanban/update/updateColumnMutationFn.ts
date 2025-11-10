import type { IKanbanBoard, IKanbanCommonParams } from '@/shared/interfaces/IKanban';
import type { AxiosResponse } from 'axios';
import { KanbanService } from '@/services/kanban/kanbanService';

export const updateColumnMutationFn = async ({
  slug,
  columnId,
  data,
}: IKanbanCommonParams): Promise<AxiosResponse<IKanbanBoard>> => {
  return KanbanService.update({ slug, columnId, data });
};
