import type { OrderDirection } from '../enums/orderDirection';
import type { IAddress } from './IAddress';
import type { IPaginatedRequest } from './IPaginate';
import type { ISortOption } from './ISortOption';
import type { IUserAccountGeneral } from './IUser';

export type FindUsersParams = IAddress & IUserAccountGeneral & {};

export interface IFilterGeneric extends IPaginatedRequest {
  searchTerm?: string;
  orderBy?: OrderDirection;
  sortBy?: string;
  sort?: ISortOption[];
  filters?: Partial<FindUsersParams>;
}
