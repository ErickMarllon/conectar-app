import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Card,
  Container,
  Divider,
  IconButton,
  Tab,
  Table,
  TableBody,
  TableContainer,
  Tabs,
  Tooltip,
} from '@mui/material';
import { PATH_DASHBOARD } from '@/routes/paths';
import ConfirmDialog from '@/components/confirm-dialog';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import Iconify from '@/components/iconify';
import Scrollbar from '@/components/scrollbar';
import {
  TableHeadCustom,
  TableNoData,
  TableSelectedAction,
  TableSkeleton,
  useTable,
} from '@/components/table';
import { useThemesStore } from '@/stores/themes.store';
import { CustomPaginate } from '@/components/custom-paginate';
import { useUsers } from '@/queries/useListUsers/useListUsers';
import { useUserDelete } from '@/queries/user/delete/useUserDelete';
import { useUserPathStatus } from '@/queries/user/pathStatus/useUserPath';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDebouncedCallback } from 'use-debounce';
import { ROLE_OPTIONS_FILTER } from './components/constants/userRoles';
import { UserTableRow, UserTableToolbar } from './components/list';
import UserFilterDrawer from './components/UserFilterDrawer';
import { countActiveFilters } from './components/utils/countActiveFilters';
import type { FindUsersParams, IFilterGeneric } from '@/shared/interfaces/IFilter';
import { useForm } from 'react-hook-form';
import FormProvider from '@/components/hook-form';
import { TABLE_HEAD } from './components/constants/tableHead';
import { STATUS_OPTIONS } from './components/constants/userStatusOptions';
import { formFindUsersFields } from './components/constants/findUsersFields';
import { DEFAULT_TABLE_CONFIG } from './components/constants/defaultTableUserConfig';

export function UserListPage() {
  const [filterSearch, setFilterSearch] = useState('');
  const [filters, setFilters] = useState<Partial<FindUsersParams>>({
    role: 'all',
    status: 'all',
  } as FindUsersParams);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [q, setQ] = useState<string | undefined>(undefined);
  const [openFilter, setOpenFilter] = useState(false);
  const { mutate: handleDelete } = useUserDelete();
  const { mutate: handlePathStatus } = useUserPathStatus();
  const { themeStretch } = useThemesStore();
  const navigate = useNavigate();
  const debounced = useDebouncedCallback((value) => setQ(value), 1000);
  const tableProps = useTable(DEFAULT_TABLE_CONFIG);

  const params: Partial<IFilterGeneric> = {
    page: tableProps.page,
    limit: tableProps.rowsPerPage,
    orderBy: tableProps.order,
    sortBy: tableProps.orderBy,
    searchTerm: q,
    filters: {
      ...filters,
      status: filters && filters.status !== 'all' ? filters.status : undefined,
      role: filters && filters.role !== 'all' ? filters.role : undefined,
    },
  };

  const { data, refetch, isLoading } = useUsers({ params });

  const dataInPage = useMemo(() => data?.data ?? [], [data?.data]);
  const { isFiltered, filtersCount } = useMemo(() => {
    const isSearch = filterSearch?.trim() !== '';

    const isFiltersRole = filters?.role !== 'all';
    const isFiltersStatus = filters?.status !== 'all';
    const filtersCount = countActiveFilters({
      ...filters,
      role: filters?.role !== 'all' ? filters?.role : undefined,
      status: filters?.status !== 'all' ? filters?.status : undefined,
    });
    const isFiltered = isSearch || isFiltersRole || isFiltersStatus || filtersCount > 0;
    return { isFiltered, filtersCount };
  }, [filterSearch, filters]);

  const isNotFound = !!dataInPage && !dataInPage.length;

  const handleToggleConfirm = () => setOpenConfirm((prev) => !prev);

  const handleFilterStatus = (_: React.SyntheticEvent<Element, Event>, newValue: string) => {
    setFilters((prev) => ({
      ...prev,
      status: newValue,
    }));
  };

  const handlefilterSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterSearch(event.target.value);
    debounced(event.target.value);
  };

  const handleFilterRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setFilters((prev) => ({
      ...prev,
      role: newValue,
    }));
  };

  const handleDeleteRows = (ids: string | string[]) => {
    const rowsToDelete = Array.isArray(ids) ? ids : [ids];

    handleDelete(rowsToDelete, {
      onSuccess: () => {
        handleToggleConfirm();
        toast.success(
          rowsToDelete.length === 1
            ? 'Item deleted successfully'
            : `Successfully deleted ${rowsToDelete.length} items!`,
        );
        tableProps.setSelected([]);
        refetch();
      },
      onError: () => {
        toast.error(
          rowsToDelete.length === 1
            ? 'Failed to delete item'
            : `Failed to delete ${rowsToDelete.length} items!`,
        );
      },
    });
  };

  const handleToggleStatusRow = (id: string) => {
    handlePathStatus(id, {
      onSuccess: () => {
        tableProps.setSelected([]);
        toast.success('Update success!');
        refetch();
      },
      onError: () => {
        toast.error('Update failed!');
      },
    });
  };

  const handleEditRow = (id: string) => navigate(PATH_DASHBOARD.user.editSlug.replace(':slug', id));

  const methods = useForm();

  const handleResetFilter = () => {
    setFilterSearch('');
    setQ(undefined);
    setFilters({
      role: 'all',
      status: 'all',
    });
    methods.reset();
  };

  const handleToggleFilter = () => {
    if (!openFilter)
      methods.reset({
        role: filters.role ?? 'all',
        status: filters.status ?? 'all',
      });

    setOpenFilter((prev) => !prev);
  };
  const handleSubmit = () => {
    setFilters(methods.watch() as FindUsersParams);
  };

  const renderAdvancedFilter = () => (
    <UserFilterDrawer
      isDefault={false}
      filtersCount={filtersCount}
      open={openFilter}
      onOpen={handleToggleFilter}
      onClose={handleToggleFilter}
      onResetFilter={handleResetFilter}
      onSubmit={handleSubmit}
      options={formFindUsersFields}
    />
  );

  return (
    <FormProvider methods={methods}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="User List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.user.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New User
            </Button>
          }
        />

        <Card>
          <Tabs
            value={filters?.status ?? 'all'}
            onChange={handleFilterStatus}
            sx={{
              px: 2,
              bgcolor: 'background.neutral',
            }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab key={tab} label={tab.toLowerCase()} value={tab} />
            ))}
          </Tabs>

          <Divider />

          <UserTableToolbar
            isFiltered={isFiltered}
            filterName={filterSearch}
            filterRole={filters?.role ?? 'all'}
            optionsRole={ROLE_OPTIONS_FILTER}
            onFilterName={handlefilterSearch}
            onFilterRole={handleFilterRole}
            onResetFilter={handleResetFilter}
            advancedFilter={renderAdvancedFilter()}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={tableProps.dense}
              numSelected={tableProps.selected.length}
              rowCount={dataInPage && dataInPage?.length}
              onSelectAllRows={(checked) => {
                if (dataInPage ? dataInPage?.length : 0) {
                  tableProps.onSelectAllRows(
                    checked,
                    dataInPage.map((row) => row.id),
                  );
                }
              }}
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={handleToggleConfirm}>
                    <Iconify icon="eva:trash-2-outline" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={tableProps.dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={tableProps.order}
                  orderBy={tableProps.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableProps.selected.length}
                  numSelected={tableProps.selected.length}
                  onSort={tableProps.onSort}
                  onSelectAllRows={(checked) =>
                    tableProps.onSelectAllRows(
                      checked,
                      dataInPage.map((row) => row.id),
                    )
                  }
                />

                <TableBody>
                  {!isLoading ? (
                    dataInPage?.map((row) => (
                      <UserTableRow
                        key={row.id}
                        row={row}
                        selected={tableProps.selected.includes(row.id)}
                        onSelectRow={() => tableProps.onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRows(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                        onStatusRow={() => handleToggleStatusRow(row.id)}
                      />
                    ))
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

      <ConfirmDialog
        open={openConfirm}
        onClose={handleToggleConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {tableProps.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows(tableProps.selected);
              handleToggleConfirm();
            }}
          >
            Delete
          </Button>
        }
      />
    </FormProvider>
  );
}
