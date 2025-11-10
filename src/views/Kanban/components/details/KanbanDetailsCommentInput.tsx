import { Button, IconButton, InputBase, Paper, Stack, Tooltip } from '@mui/material';
import { CustomAvatar } from '@/components/custom-avatar';
import Iconify from '@/components/iconify';
import { useAuthStore } from '@/stores/userAuth.store';
import { formatFullName } from '@/utils/format/formatFullName';

export default function KanbanDetailsCommentInput() {
  const { user } = useAuthStore();
  const displayName = formatFullName(user?.first_name, user?.last_name);
  return (
    <Stack direction="row" spacing={2} sx={{ py: 3, px: 2.5 }}>
      <CustomAvatar src={user?.avatar_url} alt={displayName} name={displayName} />

      <Paper variant="outlined" sx={{ p: 1, flexGrow: 1 }}>
        <InputBase fullWidth multiline rows={2} placeholder="Type a message" sx={{ px: 1 }} />

        <Stack direction="row" alignItems="center">
          <Stack direction="row" flexGrow={1}>
            <Tooltip title="Add photo">
              <IconButton size="small">
                <Iconify icon="ic:round-add-photo-alternate" />
              </IconButton>
            </Tooltip>

            <IconButton size="small">
              <Iconify icon="eva:attach-2-fill" />
            </IconButton>
          </Stack>

          <Button variant="contained">Comment</Button>
        </Stack>
      </Paper>
    </Stack>
  );
}
