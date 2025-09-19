import type { UserRole } from '@/shared/enums';
import type { IOrderDirection } from '@/shared/enums/orderDirection';
import type { IPaginatedRequest } from '@/shared/interfaces/IPaginate';
import type { ISortOption } from '@/shared/interfaces/ISortOption';

export interface UseListParams extends IPaginatedRequest {
  email?: string;
  orderBy?: IOrderDirection;
  sortBy?: ISortOption[];
  role?: UserRole;
  searchTerm?: string;
}
