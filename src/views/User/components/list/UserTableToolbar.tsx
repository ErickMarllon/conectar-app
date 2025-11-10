import { Button, Grid, MenuItem, Stack, TextField } from '@mui/material';
import { useMemo } from 'react';
import UserSearch from '../UserSearch';
import Iconify from '@/components/iconify';

type Props = {
  isFiltered: boolean;
  onResetFilter: VoidFunction;
  onSearch: (value?: string) => void;
  advancedFilter?: React.ReactNode;
  filterRole?: string;
  optionsRole?: string[];
  onFilterRole?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function UserTableToolbar({
  isFiltered,
  onSearch,
  onResetFilter,
  advancedFilter,
  filterRole,
  optionsRole,
  onFilterRole,
}: Props) {
  const lastColumnWidth = useMemo(() => {
    const cols: string[] = [];

    if (onFilterRole) cols.push('1fr');

    if (isFiltered) cols.push('85px');

    cols.push('85px');

    return cols.join(' ');
  }, [isFiltered, onFilterRole]);

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
          sm: `${onFilterRole ? '1fr 0.6fr' : '1fr 0.3fr'}`,
        },
      }}
    >
      <Stack>
        <UserSearch fullWidth onSearch={onSearch} onCleanChange={onResetFilter} />
      </Stack>

      <Grid
        display={'grid'}
        gridTemplateColumns={`${lastColumnWidth}`}
        gridAutoFlow="row"
        alignItems="center"
        justifyContent={{
          xs: 'normal',
          sm: onFilterRole ? 'normal' : 'center',
        }}
        sx={{ gap: 2 }}
      >
        {onFilterRole && (
          <TextField
            fullWidth
            select
            id="role-label"
            name="role"
            label="Role"
            value={filterRole}
            onChange={onFilterRole}
            sx={{
              textTransform: 'capitalize',
            }}
          >
            {optionsRole?.map((option) => (
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
                {option?.toLowerCase()}
              </MenuItem>
            ))}
          </TextField>
        )}
        {advancedFilter && advancedFilter}

        {isFiltered && (
          <Button
            size="large"
            color="error"
            sx={{ flexShrink: 0 }}
            onClick={onResetFilter}
            startIcon={<Iconify icon="eva:trash-2-outline" />}
          >
            Clear
          </Button>
        )}
      </Grid>
    </Stack>
  );
}
