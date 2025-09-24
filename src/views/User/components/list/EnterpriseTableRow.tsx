import type { ITenantAccountGeneral } from '@/shared/interfaces/ITenant';
import { fTableFallback } from '@/utils/format/formatTableFallback';
import { fDateTime } from '@/utils/formatTime';
import { Avatar, Stack, TableCell, TableRow, Typography } from '@mui/material';

type Props = {
  row: ITenantAccountGeneral;
  isNavigate?: boolean;
};

export default function EnterpriseTableRow({ row, isNavigate = false }: Props) {
  const { logo_url, name, email, phone_number, whatsapp, created_at, addresses } = row;
  const addressDefault = addresses?.find((a) => a.is_default);
  return (
    <>
      <TableRow hover onClick={() => console.log('navigate tenant Product')}>
        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={logo_url} />

            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="body2" noWrap>
              {fTableFallback(email, 15)}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="body2" noWrap>
              {fTableFallback(phone_number, 15)}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="body2" noWrap>
              {fTableFallback(whatsapp, 15)}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography variant="body2" noWrap>
              {fTableFallback(addressDefault?.street, 15)}
            </Typography>
            {addressDefault?.street_number && (
              <Typography variant="body2" noWrap>
                {addressDefault?.street_number}
              </Typography>
            )}
          </Stack>
        </TableCell>
        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="body2" noWrap>
              {fTableFallback(addressDefault?.neighborhood, 15)}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="body2" noWrap>
              {fTableFallback(addressDefault?.state, 10)}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {fDateTime(created_at)}
        </TableCell>
      </TableRow>
    </>
  );
}
