import { Card, Container, Table, TableBody, TableContainer } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';
import type { FindEnterpriseParams } from '@/shared/interfaces/IFilter';
import { DEFAULT_TABLE_CONFIG } from '../constants/defaultTableUserConfig';
import { formFindTenantFields } from '../constants/findTenantFields';
import { TABLE_TENANT_HEAD } from '../constants/tableTenantHead';
import EnterpriseTableRow from './EnterpriseTableRow';
import UserTableToolbar from './UserTableToolbar';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { CustomPaginate } from '@/components/custom-paginate';
import FilterDrawer from '@/components/FilterDrawer';
import FormProvider from '@/components/hook-form';
import Scrollbar from '@/components/scrollbar';
import { TableHeadCustom, TableNoData, TableSkeleton, useTable } from '@/components/table';
import { useDiffObjects } from '@/hooks/useDiffObjects';
import { useListTenant } from '@/queries/tenant/useList/useListTenant';
import { PATH_DASHBOARD } from '@/routes/paths';
import { useThemesStore } from '@/stores/themes.store';

type IFilterState = Partial<FindEnterpriseParams | undefined>;

export default function EnterpriseList() {
  const [filters, setFilters] = useState<IFilterState>({});
  const [q, setQ] = useState<string | undefined>(undefined);
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const { themeStretch } = useThemesStore();
  const tableProps = useTable(DEFAULT_TABLE_CONFIG);
  const debounced = useDebouncedCallback((value) => setQ(value), 1000);

  const {
    diffForm,
    hasDiff: isFiltered,
    diffCount: filtersCount,
  } = useDiffObjects<Partial<FindEnterpriseParams>>({ current: filters });

  const params = {
    page: tableProps.page,
    limit: tableProps.rowsPerPage,
    orderBy: tableProps.order,
    sortBy: tableProps.orderBy,
    searchTerm: q,
    filters: diffForm,
  };

  const { data, isLoading } = useListTenant({ params });

  const dataInPage = data?.data ?? [];

  const isNotFound = !!dataInPage && !dataInPage.length;

  const handleChangeSearch = async (value?: string) => debounced(value);

  const methods = useForm();

  const handleResetFilter = () => {
    setQ(undefined);
    setFilters({});
    methods.reset();
  };

  const handleToggleFilter = () => {
    if (!openFilter) methods.reset(diffForm);
    setOpenFilter((prev) => !prev);
  };

  const handleSubmit = () => {
    setFilters(methods.watch());
  };

  const renderAdvancedFilter = () => (
    <FilterDrawer
      isDefault={false}
      filtersCount={filtersCount}
      open={openFilter}
      onOpen={handleToggleFilter}
      onClose={handleToggleFilter}
      onResetAll={handleResetFilter}
      onSubmit={handleSubmit}
      options={formFindTenantFields}
      buttonOpenProps={{
        size: 'large',
      }}
    />
  );

  return (
    <FormProvider methods={methods}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Enterprise List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Enterprise', href: PATH_DASHBOARD.user.root },
            { name: 'List' },
          ]}
        />
        <Card>
          <UserTableToolbar
            isFiltered={isFiltered}
            onSearch={handleChangeSearch}
            onResetFilter={handleResetFilter}
            advancedFilter={renderAdvancedFilter()}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table size={tableProps.dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={tableProps.order}
                  orderBy={tableProps.orderBy}
                  headLabel={TABLE_TENANT_HEAD}
                  rowCount={tableProps.selected.length}
                  numSelected={tableProps.selected.length}
                  onSort={tableProps.onSort}
                />

                <TableBody>
                  {!isLoading ? (
                    dataInPage?.map((row) => <EnterpriseTableRow key={row.id} row={row} />)
                  ) : (
                    <TableSkeleton />
                  )}

                  {!isLoading && <TableNoData isNotFound={isNotFound} />}
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          {data?.meta && data?.meta.totalPages > 1 && (
            <CustomPaginate
              totalPages={data?.meta.totalPages}
              isLoading={isLoading}
              dense={tableProps.dense}
              page={data?.meta.currentPage}
              rowsPerPage={data?.meta.limit}
              onPageChange={tableProps.onChangePage}
              onRowsPerPageChange={tableProps.onChangeRowsPerPage}
            />
          )}
        </Card>
      </Container>
    </FormProvider>
  );
}
