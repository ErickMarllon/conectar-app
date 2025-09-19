import { OrderDirection } from '@/shared/enums/orderDirection';
import type { IFilterGeneric } from '@/shared/interfaces/IFilter';
import { create } from 'zustand';

interface UserFilterState extends IFilterGeneric {
  setFilters: (filters: Partial<IFilterGeneric>) => void;
  reset: () => void;
  resetField: (field: string) => void;
}

const defaultFilters: IFilterGeneric = {
  searchTerm: undefined,
  orderBy: OrderDirection.DESC,
  sortBy: [],
  filters: {},
  page: 1,
  limit: 5,
};

export const useFilterListUsersStore = create<UserFilterState>((set) => ({
  ...defaultFilters,
  setFilters: (filters) =>
    set((state) => {
      const shouldResetPage =
        filters.searchTerm?.trim() !== undefined ||
        filters.orderBy !== undefined ||
        filters.sortBy !== undefined;

      return {
        ...state,
        ...filters,
        page: shouldResetPage ? 1 : (filters.page ?? state.page),
      };
    }),
  resetField: (field: string) =>
    set((state) => {
      if (!state.filters) return state;

      const newFilters = { ...state.filters };
      delete newFilters[field as keyof typeof newFilters];

      return {
        ...state,
        filters: newFilters,
        page: 1,
      };
    }),

  reset: () =>
    set(() => ({
      ...defaultFilters,
      filters: {},
    })),
}));
