import type { PaginateMode } from '../enums';
import type { ISortOption } from './ISortOption';
import type { OrderDirection } from '../enums/orderDirection';

export interface IPaginatedRequest {
  limit: number;
  page: number;
  cursor?: string;
  orderBy?: OrderDirection;
  sortBy?: string;
  sort?: ISortOption[];
}
export interface IPaginatedReq<T> {
  limit?: number;
  page?: number;
  cursor?: string;
  orderBy?: OrderDirection;
  sortBy?: string;
  mode?: PaginateMode;
  sort?: ISortOption[];
  searchTerm?: string;
  filters?: T;
}
export interface IPaginatedMeta {
  currentPage: number;
  limit: number;
  nextPage?: number;
  previousPage?: number;
  totalPages: number;
  totalRecords?: number;
}

export interface IPaginatedResponse<T> {
  data: T[];
  meta: IPaginatedMeta;
}
