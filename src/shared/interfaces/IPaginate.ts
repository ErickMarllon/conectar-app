export interface IPaginatedRequest {
  limit: number;
  page: number;
  cursor?: string;
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
