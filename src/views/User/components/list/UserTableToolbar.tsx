// @mui
import { Button, Grid, InputAdornment, MenuItem, Stack, TextField } from '@mui/material';
// components
import Iconify from '@/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  filterName: string;
  filterRole: string;
  isFiltered: boolean;
  optionsRole: string[];
  onResetFilter: VoidFunction;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterRole: (event: React.ChangeEvent<HTMLInputElement>) => void;
  advancedFilter?: React.ReactNode;
};

export default function UserTableToolbar({
  isFiltered,
  filterName,
  filterRole,
  optionsRole,
  onFilterRole,
  onFilterName,
  onResetFilter,
  advancedFilter,
}: Props) {
  return (
    <Stack
      gap={2}
      alignItems="center"
      display="grid"
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      sx={{
        px: 2.5,
        py: 3,
        gridTemplateColumns: {
          xs: '1fr',
          md: '0.4fr 1fr',
        },
      }}
    >
      <Grid
        display={'grid'}
        gridTemplateColumns="85px 1fr"
        direction="row"
        alignItems="center"
        sx={{ gap: 4 }}
      >
        {advancedFilter && advancedFilter}
        {onFilterRole && (
          <TextField
            fullWidth
            select
            label="Role"
            value={filterRole?.toLowerCase()}
            onChange={onFilterRole}
            sx={{
              textTransform: 'capitalize',
            }}
          >
            {optionsRole.map((option) => (
              <MenuItem
                key={option}
                value={option}
                sx={{
                  m: 1,
                  borderRadius: 0.75,
                  typography: 'body2',
                  textTransform: 'capitalize',
                }}
              >
                {option}
              </MenuItem>
            ))}
          </TextField>
        )}
      </Grid>
      <Stack direction="row" sx={{ gap: 2 }}>
        <TextField
          value={filterName}
          onChange={onFilterName}
          placeholder="Search..."
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
              endAdornment: filterName && (
                <InputAdornment position="end" onClick={onResetFilter} sx={{ cursor: 'pointer' }}>
                  <Iconify icon="eva:close-fill" sx={{ mr: 1, color: 'text.disabled' }} />
                </InputAdornment>
              ),
            },
          }}
        />

        {isFiltered && (
          <Button
            color="error"
            sx={{ flexShrink: 0 }}
            onClick={onResetFilter}
            startIcon={<Iconify icon="eva:trash-2-outline" />}
          >
            Clear
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
