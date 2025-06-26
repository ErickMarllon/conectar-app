import type { Order, SortBy, UserRole } from '@/shared/constants/enums';
import type { IPaginatedRequest } from '@/shared/interfaces/IPaginate';

export interface UseListParams extends IPaginatedRequest {
  email?: string;
  order?: Order;
  sort?: SortBy;
  role?: UserRole;
  search?: string;
}
