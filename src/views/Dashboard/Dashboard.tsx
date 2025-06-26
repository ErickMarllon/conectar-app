import { CardUser } from '@/components/card-user';
import { useUsers } from '@/queries/useListUsers/useListUsers';
import { useEffect, useState } from 'react';
import { Order, SortBy } from '@/shared/constants/enums';
import { useDebounce } from 'use-debounce';
import { UserFormModal } from '@/components/user-form-modal/user-form-modal';
import { TableOrder } from '@/components/table-order';
import { TableSearch } from '@/components/table-search';
import { TableSort } from '@/components/table-sort';
import { Paginate } from '@/components/Paginate';
import { useDashboardUserModal } from './context/use-dashboard.context';

export function Dashboard() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [orderBy, setOrderBy] = useState<Order>(Order.ASC);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.CREATED_AT);
  const [q, setQ] = useState<string | undefined>(undefined);
  const [qValue] = useDebounce(q, 1000);
  const { registerFunction } = useDashboardUserModal();

  const { data, refetch } = useUsers({
    page,
    limit,
    order: orderBy,
    search: qValue,
    sort: sortBy,
  });

  useEffect(() => {
    setPage(1);
  }, [limit, orderBy, sortBy, qValue]);

  useEffect(() => {
    registerFunction(refetch);
  }, [refetch, registerFunction]);
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid gap-8 rounded-xl">
        <div className="grid grid-cols-1 gap-4 rounded-xl py-4">
          <TableSearch search={q} onSearchChange={(value) => setQ(value)} />
          <div className="flex gap-4">
            <TableSort sortBy={sortBy} onSortChange={(value) => setSortBy(value as SortBy)} />
            <TableOrder order={orderBy} onOrderChange={(value) => setOrderBy(value as Order)} />
          </div>
        </div>
        <div className="h-[600px] overflow-auto pr-4">
          <div className="grid min-h-[100vh] auto-rows-min grid-cols-1 justify-center gap-4 rounded-xl sm:grid-cols-2 md:min-h-min md:grid-cols-[repeat(auto-fill,minmax(320px,1fr))]">
            <CardUser isPlus />
            {data?.data && data?.data.map((user) => <CardUser key={user.id} user={user} />)}
          </div>
        </div>

        {data?.meta && (
          <Paginate
            limit={limit}
            onPageChange={setPage}
            onLimitChange={setLimit}
            meta={data.meta}
          />
        )}
      </div>
      <UserFormModal />
    </div>
  );
}
