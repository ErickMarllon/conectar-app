import { Stack, TablePagination, Pagination, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface CustomPaginateProps {
  count?: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowsPerPageOptions?: number[];
  disabledAll?: boolean;
  disabledRows?: boolean;
  disabledPagination?: boolean;
  isLoading?: boolean;
  totalPages?: number;
  id?: string;
  name?: string;
  dense?: boolean;
}

export default function CustomPaginate({
  count = 0,
  page,
  rowsPerPage,
  totalPages,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [5, 10, 20, 50],
  disabledAll = false,
  disabledRows = false,
  disabledPagination = false,
  isLoading = false,
  id,
  name,
}: CustomPaginateProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (isLoading) {
    return null;
  }

  let pages = totalPages;
  if (!pages && count) pages = Math.ceil(count / rowsPerPage);

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    return disabledAll || disabledPagination ? null : onPageChange(null, value);
  };

  return (
    <Stack
      direction={{ xs: 'row' }}
      alignItems={{ xs: 'center' }}
      justifyContent="space-between"
      sx={{ width: '100%', pl: 2, pr: 3 }}
    >
      <TablePagination
        component="div"
        id={id ? `${id}-table-pagination` : `table-pagination`}
        count={pages ?? 0}
        page={page}
        rowsPerPageOptions={rowsPerPageOptions}
        rowsPerPage={rowsPerPage}
        onPageChange={() => {}}
        onRowsPerPageChange={onRowsPerPageChange}
        labelDisplayedRows={() => ''}
        labelRowsPerPage={isMobile ? '' : 'Per page:'}
        ActionsComponent={() => null}
        disabled={disabledAll || disabledRows}
        sx={{
          border: 'none',
        }}
        slotProps={{
          toolbar: {
            sx: {
              p: '0 !important',
              m: 0,
            },
          },
          select: {
            disabled: disabledAll || disabledRows,
            name: name ? `${name}-rows-per-page` : `rows-per-page`,
            sx: {
              p: 0,
              m: 0,
            },
          },
        }}
      />

      <Pagination
        id={id ? `${id}-pagination` : `pagination`}
        count={pages}
        page={page}
        onChange={handleChangePage}
        showFirstButton={!isMobile}
        showLastButton={!isMobile}
        siblingCount={!isMobile ? 1 : 0}
        color="primary"
        disabled={disabledAll || disabledPagination}
      />
    </Stack>
  );
}
