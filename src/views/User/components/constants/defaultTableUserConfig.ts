import { OrderDirection } from '@/shared/enums/orderDirection';

export const DEFAULT_TABLE_CONFIG = {
  defaultCurrentPage: 1,
  defaultRowsPerPage: 5,
  defaultOrder: OrderDirection.DESC,
  defaultOrderBy: 'created_at',
};
