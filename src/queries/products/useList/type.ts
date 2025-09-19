import type { OrderDirection } from '@/shared/enums/orderDirection';
import type { IPaginatedRequest } from '@/shared/interfaces/IPaginate';
import type { IProduct } from '@/shared/interfaces/IProduct';
import type { ISortOption } from '@/shared/interfaces/ISortOption';

export interface useListProductsParams extends IPaginatedRequest {
  searchTerm?: string;
  orderBy: OrderDirection;
  sortBy?: ISortOption[];
  filters?: Partial<IProduct>;
}
