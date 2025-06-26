import type { IUser } from '@/shared/interfaces/IUser';
import type { AxiosResponse } from 'axios';
import { api } from '@/http/api';
import type { Order, SortBy, UserRole } from '@/shared/constants/enums';
import type { IPaginatedResponse } from '@/shared/interfaces/IPaginate';

class UsersService {
  public static async list(
    order?: Order,
    sort?: SortBy,
    role?: UserRole,
    search?: string,
    meta?: { page: number; limit: number },
  ): Promise<AxiosResponse<IPaginatedResponse<IUser>>> {
    return await api.get<IPaginatedResponse<IUser>>('users', {
      params: {
        order,
        sortBy: sort,
        role,
        search,
        page: meta?.page,
        limit: meta?.limit,
      },
    });
  }
}

export { UsersService };
