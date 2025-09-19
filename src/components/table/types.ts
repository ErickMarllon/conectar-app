// ----------------------------------------------------------------------

import type { IOrderDirection } from '@/shared/enums/orderDirection';

export type TableProps = {
  dense: boolean;
  page: number;
  rowsPerPage: number;
  order: IOrderDirection | undefined;
  orderBy: string | undefined;
  //
  selected: string[];
  onSelectRow: (id: string) => void;
  onSelectAllRows: (checked: boolean, newSelecteds: string[]) => void;
  //
  onSort: (id: string) => void;
  onChangePage: (event: unknown, newPage: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDense: (event: React.ChangeEvent<HTMLInputElement>) => void;
  //
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setDense: React.Dispatch<React.SetStateAction<boolean>>;
  setOrder: React.Dispatch<React.SetStateAction<IOrderDirection | undefined>>;
  setOrderBy: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
};
