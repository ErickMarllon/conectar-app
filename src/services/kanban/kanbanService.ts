import type { AxiosResponse } from 'axios';
// import { api } from '@/http/api';
import type {
  IKanbanBoard,
  IKanbanCommonParams,
  IKanbanDeleteParams,
} from '@/shared/interfaces/IKanban';
import axios from 'axios';
import { removeEmpty } from '@/utils/removeEmpty';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

class KanbanService {
  public static async get(slug: string): Promise<AxiosResponse<IKanbanBoard>> {
    return await api.get<IKanbanBoard>(`/kanban/board`, {
      // params: { slug },
    });
  }

  public static async update({
    slug,
    columnId,
    data,
  }: IKanbanCommonParams): Promise<AxiosResponse<IKanbanBoard>> {
    return await api.put<IKanbanBoard>(
      `/kanban/columns/update`,
      data,
      //   {
      //   params: { slug },
      // }
    );
  }

  public static async create({
    slug,
    columnId,
    data,
  }: IKanbanCommonParams): Promise<AxiosResponse<IKanbanBoard>> {
    return await api.post<IKanbanBoard>(`/kanban/columns/new`, data, {
      params: { slug },
    });
  }

  public static async delete({
    slug,
    cardId,
    columnId,
  }: IKanbanDeleteParams): Promise<AxiosResponse<void>> {
    const params = removeEmpty({
      slug,
      cardId,
      columnId,
    });
    return await api.delete(`/kanban/columns/delete`, { params });
  }
}

export { KanbanService };
