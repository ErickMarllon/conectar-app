import { Box, Container, Stack } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';
import type { FindEnterpriseParams } from '@/shared/interfaces/IFilter';
import { EnterpriseCard } from './components/cards';
import { DEFAULT_TABLE_CONFIG } from './components/constants/defaultTableUserConfig';
import { formFindTenantFields } from './components/constants/findTenantFields';
import UserSearch from './components/UserSearch';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { CustomPaginate } from '@/components/custom-paginate';
import EmptyContent from '@/components/empty-content';
import FilterDrawer from '@/components/FilterDrawer';
import FormProvider from '@/components/hook-form';
import Loading from '@/components/loading';
import { useTable } from '@/components/table';
import { useDiffObjects } from '@/hooks/useDiffObjects';
import { useListTenant } from '@/queries/tenant/useList/useListTenant';
import { PATH_DASHBOARD } from '@/routes/paths';
import { useThemesStore } from '@/stores/themes.store';

type IFilterState = Partial<FindEnterpriseParams | undefined>;

export function EnterpriseCards() {
  const { themeStretch } = useThemesStore();
  const [openFilter, setOpenFilter] = useState(false);
  const [filters, setFilters] = useState<IFilterState>({});
  const [q, setQ] = useState<string | undefined>(undefined);
  const debounced = useDebouncedCallback(setQ, 1000);
  const tableProps = useTable(DEFAULT_TABLE_CONFIG);
  const methods = useForm();

  const {
    diffForm,
    diffCount: filtersCount,
    hasDiff: isFiltered,
  } = useDiffObjects<Partial<FindEnterpriseParams>>({
    current: filters,
  });

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

  const handleSubmit = () => setFilters(methods.watch());

  const handleCleanChange = () => setQ(undefined);

  const handleToggleFilter = () => {
    if (!openFilter) methods.reset(diffForm);
    setOpenFilter((prev) => !prev);
  };

  const handleResetFilter = () => {
    methods.reset();
    setFilters(undefined);
  };

  return (
    <>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Enterprise Cards"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Enterprise', href: PATH_DASHBOARD.user.root },
            { name: 'Cards' },
          ]}
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
              size="small"
              onSearch={handleChangeSearch}
              onCleanChange={handleCleanChange}
            />
            <Stack direction="row" gap={1} flexShrink={0} sx={{ my: 1 }}>
              <FilterDrawer
                isDefault={false}
                filtersCount={filtersCount}
                open={openFilter}
                onOpen={handleToggleFilter}
                onClose={handleToggleFilter}
                onResetAll={handleResetFilter}
                onSubmit={handleSubmit}
                options={formFindTenantFields}
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
            {!isNotFound &&
              !isLoading &&
              dataInPage.map((enterprise) => (
                <EnterpriseCard key={enterprise.id} enterprise={enterprise} />
              ))}

            {!isNotFound && isLoading && <Loading mode="global" />}

            {isNotFound && !isLoading && (
              <EmptyContent
                title={isFiltered ? 'No results' : 'No enterprises registered'}
                description="It looks like there are no enterprises available at the moment."
                gridColumn="1 / -1"
                height="100vh"
                justifySelf="center"
              />
            )}
          </Box>
        </FormProvider>

        {data?.meta && (data?.meta.totalPages > 1 || data.meta.limit > 5) && (
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
