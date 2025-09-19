import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { CustomPaginate } from '@/components/custom-paginate';
import FormProvider from '@/components/hook-form';
import Iconify from '@/components/iconify';
import { useTable } from '@/components/table';
import { useUsers } from '@/queries/useListUsers/useListUsers';
import { PATH_DASHBOARD } from '@/routes/paths';
import type { FindUsersParams } from '@/shared/interfaces/IFilter';
import { useThemesStore } from '@/stores/themes.store';
import { Box, Button, Container, Stack } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import { UserCard } from './components/cards';
import { DEFAULT_TABLE_CONFIG } from './components/constants/defaultTableUserConfig';
import { formFindUsersFields } from './components/constants/findUsersFields';
import UserFilterDrawer from './components/UserFilterDrawer';
import UserSearch from './components/UserSearch';
import { countActiveFilters } from './components/utils/countActiveFilters';

export function UserCardsPage() {
  const { themeStretch } = useThemesStore();
  const [openFilter, setOpenFilter] = useState(false);
  const [filters, setFilters] = useState<FindUsersParams | undefined>(undefined);
  const [q, setQ] = useState<string | undefined>(undefined);
  const debounced = useDebouncedCallback(setQ, 1000);
  const tableProps = useTable(DEFAULT_TABLE_CONFIG);
  const methods = useForm();

  const params = {
    page: tableProps.page,
    limit: tableProps.rowsPerPage,
    orderBy: tableProps.order,
    sortBy: tableProps.orderBy,
    searchTerm: q,
    filters,
  };

  const { data, isLoading } = useUsers({ params });

  const handleChangeSearch = async (value?: string) => debounced(value);

  const handleSubmit = () => setFilters(methods.watch() as FindUsersParams);

  const handleCleanChange = () => setQ(undefined);

  const handleToggleFilter = () => setOpenFilter((prev) => !prev);

  const handleResetFilter = () => {
    methods.reset();
    setFilters(undefined);
  };

  return (
    <>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="User Cards"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: 'Cards' },
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
        <FormProvider methods={methods}>
          <Stack
            spacing={2}
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ sm: 'center' }}
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <UserSearch
              data={data?.data}
              onSearch={handleChangeSearch}
              onCleanChange={handleCleanChange}
            />
            <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
              <UserFilterDrawer
                isDefault={false}
                filtersCount={countActiveFilters(filters)}
                open={openFilter}
                onOpen={handleToggleFilter}
                onClose={handleToggleFilter}
                onResetFilter={handleResetFilter}
                onSubmit={handleSubmit}
                options={formFindUsersFields}
              />
            </Stack>
          </Stack>
          <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            }}
            sx={{
              overflowY: 'auto',
            }}
          >
            {data?.data && data.data?.map((user) => <UserCard key={user.id} user={user} />)}
          </Box>
        </FormProvider>
        {data?.meta && data?.meta.totalPages > 1 && (
          <CustomPaginate
            totalPages={data?.meta.totalPages}
            count={data?.meta.totalRecords}
            isLoading={isLoading}
            page={data?.meta.currentPage}
            rowsPerPage={data?.meta.limit}
            onPageChange={tableProps.onChangePage}
            onRowsPerPageChange={tableProps.onChangeRowsPerPage}
          />
        )}
      </Container>
    </>
  );
}
