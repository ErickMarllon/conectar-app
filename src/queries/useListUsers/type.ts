import type { UserRole } from '@/shared/enums';
import type { IPaginatedRequest } from '@/shared/interfaces/IPaginate';

export interface UseListParams extends IPaginatedRequest {
  email?: string;
  role?: UserRole;
  searchTerm?: string;
}
