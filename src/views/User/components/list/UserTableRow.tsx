import { useState } from 'react';
// @mui
import {
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
} from '@mui/material';
// @types
// components
import Label from '@/components/label';
import Iconify from '@/components/iconify';
import MenuPopover from '@/components/menu-popover';
import ConfirmDialog from '@/components/confirm-dialog';
import type { IUserAccountGeneral } from '@/shared/interfaces/IUser';
import { formatFullName } from '@/utils/format/formatFullName';
import { fDateTime } from '@/utils/formatTime';
import { statusColorMap } from '../constants/userStatusColor';

type Props = {
  row: IUserAccountGeneral;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  onStatusRow: VoidFunction;
};

export default function UserTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  onStatusRow,
}: Props) {
  const { first_name, last_name, email, avatar_url, role, is_verified, status, created_at } = row;
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={formatFullName(first_name, last_name)} src={avatar_url} />

            <Typography variant="subtitle2" noWrap>
              {formatFullName(first_name, last_name)}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="body2" noWrap>
              {email}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {role?.toLowerCase()}
        </TableCell>

        <TableCell align="center">
          <Iconify
            icon={is_verified ? 'eva:checkmark-circle-fill' : 'eva:clock-outline'}
            sx={{
              width: 20,
              height: 20,
              color: 'success.main',
              ...(!is_verified && { color: 'warning.main' }),
            }}
          />
        </TableCell>

        <TableCell align="left">
          <Label
            variant="soft"
            color={statusColorMap[status ? status.toLowerCase() : 'default']}
            sx={{ textTransform: 'capitalize' }}
          >
            {status}
          </Label>
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {fDateTime(created_at)}
        </TableCell>

        <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            onStatusRow();
            handleClosePopover();
          }}
        >
          <Iconify
            icon={status !== 'active' ? 'mdi:user' : 'mdi:user-block'}
            sx={{
              width: 20,
              height: 20,
              color: status !== 'active' ? 'success.main' : 'error.main',
            }}
          />
          {status !== 'active' ? 'Active' : 'Banned'}
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
