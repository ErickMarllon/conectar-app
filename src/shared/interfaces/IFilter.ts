import type { UserRole } from '../enums';
import type { IAddress } from './IAddress';
import type { IPaginatedRequest } from './IPaginate';
import type { ITenantAccountGeneral } from './ITenant';
import type { IUserAccountGeneral } from './IUser';

export type FindUsersParams = IAddress &
  Omit<IUserAccountGeneral, 'role'> & {
    role: string | UserRole;
  };
export type FindEnterpriseParams = IAddress & Omit<ITenantAccountGeneral, 'status'>;

export type IFilterBase<TFilters> = IPaginatedRequest & {
  searchTerm?: string;
  filters?: Partial<TFilters>;
};

export type IFilterGeneric = IFilterBase<FindUsersParams>;

export type IFilterEnterpriseGeneric = IFilterBase<FindEnterpriseParams>;
