import { handleError } from '@/errors/handleError';
import { KanbanService } from '@/services/kanban/kanbanService';
import type { IKanbanBoard } from '@/shared/interfaces/IKanban';
import { AxiosError } from 'axios';

export const boardQueryFn = async (slug: string): Promise<IKanbanBoard> => {
  try {
    const response = await KanbanService.get(slug);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    handleError({
      error: axiosError,
      customMessage: 'Ocorreu um Erro ao listar usuário ',
      returnBoolean: false,
    });

    throw axiosError;
  }
};
