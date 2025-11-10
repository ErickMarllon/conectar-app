import type { IKanbanBoard, IKanbanCommonParams } from '@/shared/interfaces/IKanban';
import type { AxiosResponse } from 'axios';
import { KanbanService } from '@/services/kanban/kanbanService';

export const createColumnMutationFn = async ({
  slug,
  columnId,
  data,
}: IKanbanCommonParams): Promise<AxiosResponse<IKanbanBoard>> => {
  return KanbanService.create({ slug, columnId, data });
};
