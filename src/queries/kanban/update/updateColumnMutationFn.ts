import { KanbanService } from '@/services/kanban/kanbanService';
import type { IKanbanBoard, IKanbanCommonParams } from '@/shared/interfaces/IKanban';
import type { AxiosResponse } from 'axios';

export const updateColumnMutationFn = async ({
  slug,
  columnId,
  data,
}: IKanbanCommonParams): Promise<AxiosResponse<IKanbanBoard>> => {
  return KanbanService.update({ slug, columnId, data });
};
