import type { IPaginatedRequest } from '@/shared/interfaces/IPaginate';
import type { IProduct } from '@/shared/interfaces/IProduct';

export interface useListProductsParams extends IPaginatedRequest {
  searchTerm?: string;
  filters?: Partial<IProduct>;
}
