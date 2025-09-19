import { useState, useCallback } from 'react';
//
import type { TableProps } from './types';
import type { ISortOption } from '@/shared/interfaces/ISortOption';
import { OrderDirection } from '@/shared/enums/orderDirection';

// ----------------------------------------------------------------------

type ReturnType = Omit<TableProps, 'order' | 'setOrder'> & {
  order?: OrderDirection;
  setOrder: React.Dispatch<React.SetStateAction<OrderDirection | undefined>>;
};

export type UseTableProps = {
  defaultDense?: boolean;
  defaultOrder?: OrderDirection;
  defaultSortBy?: ISortOption[];
  defaultOrderBy?: string;
  defaultSelected?: string[];
  defaultRowsPerPage?: number;
  defaultCurrentPage?: number;
};

export default function useTable(props?: UseTableProps): ReturnType {
  const [dense, setDense] = useState(!!props?.defaultDense);

  const [orderBy, setOrderBy] = useState<string | undefined>(props?.defaultOrderBy || '');

  const [order, setOrder] = useState<OrderDirection | undefined>(
    props?.defaultOrder ?? OrderDirection.DESC,
  );

  const [page, setPage] = useState(props?.defaultCurrentPage || 0);

  const [rowsPerPage, setRowsPerPage] = useState(props?.defaultRowsPerPage || 5);

  const [selected, setSelected] = useState<string[]>(props?.defaultSelected || []);

  const onSort = useCallback(
    (id: string) => {
      if (!id) return;

      if (orderBy === id) {
        if (order === OrderDirection.DESC) {
          setOrder(OrderDirection.ASC);
        } else {
          setOrder(OrderDirection.DESC);
          setOrderBy('created_at');
        }
      } else {
        setOrder(OrderDirection.DESC);
        setOrderBy(id);
      }
    },
    [order, orderBy],
  );

  const onSelectRow = useCallback(
    (id: string) => {
      const selectedIndex = selected.indexOf(id);

      let newSelected: string[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
      setSelected(newSelected);
    },
    [selected],
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  }, []);

  const onChangePage = useCallback((_: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  }, []);

  const onChangeDense = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  }, []);

  return {
    dense,
    order,
    page,
    orderBy,
    rowsPerPage,
    //
    selected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangePage,
    onChangeDense,
    onChangeRowsPerPage,
    //
    setPage,
    setDense,
    setOrder,
    setOrderBy,
    setSelected,
    setRowsPerPage,
  };
}
