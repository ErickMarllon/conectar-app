import { Box, Button, Stack, Typography } from '@mui/material';
import useLocales from '@/hooks/useLocales';
import { PATH_DOCS } from '@/routes/paths';
import { useAuthStore } from '@/stores/userAuth.store';
import { formatFullName } from '@/utils/format/formatFullName';

export default function NavDocs() {
  const { user } = useAuthStore();

  const { translate } = useLocales();

  return (
    <Stack
      spacing={3}
      sx={{
        px: 5,
        pb: 5,
        mt: 10,
        width: 1,
        display: 'block',
        textAlign: 'center',
      }}
    >
      <Box component="img" src="/assets/illustrations/illustration_docs.svg" />

      <div>
        <Typography gutterBottom variant="subtitle1">
          {`${translate('docs.hi')}, ${formatFullName(user?.first_name, user?.last_name)}`}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary', whiteSpace: 'pre-line' }}>
          {`${translate('docs.description')}`}
        </Typography>
      </div>

      <Button href={PATH_DOCS.root} target="_blank" rel="noopener" variant="contained">
        {`${translate('docs.documentation')}`}
      </Button>
    </Stack>
  );
}
