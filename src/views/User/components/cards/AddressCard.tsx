import Iconify from '@/components/iconify';
import type { IAddressSchema } from '@/schemas/address-schema';
import { alpha, Box, Button, Card, CardContent, Chip, IconButton, Typography } from '@mui/material';

export default function AddressCard({
  address,
  onEdit,
  onDelete,
  onSetDefault,
  isLoading,
}: {
  address: IAddressSchema;
  onEdit: (a: IAddressSchema) => void;
  onDelete: (a: IAddressSchema) => void;
  onSetDefault: (a: IAddressSchema) => void;
  isLoading: boolean;
}) {
  const getAddressIcon = (type: string) =>
    type === 'home' ? (
      <Iconify icon="material-symbols:home" />
    ) : (
      <Iconify icon="material-symbols:apartment" />
    );

  return (
    <Card
      sx={{
        bgcolor: (theme) => theme.palette.background.default,
        border: address.is_default
          ? (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.3)}`
          : (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent sx={{ p: 3, mb: 5, height: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            gap: 4,
            height: '100%',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Box sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
              {getAddressIcon('home')}
              <Typography variant="h6" textTransform="capitalize">
                Residencial
              </Typography>
            </Box>

            <Typography variant="body2">
              {address.street}, {address.street_number}
            </Typography>

            {address.complement && <Typography variant="body2">{address.complement}</Typography>}

            <Typography variant="body2">
              {address.city}, {address.state} {address.zip_code}
            </Typography>

            <Typography variant="body2">{address.country}</Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <Box display="flex" gap={0.5}>
              <IconButton size="small" onClick={() => onEdit(address)} color={'primary'}>
                <Iconify icon="material-symbols:edit" fontSize="small" />
              </IconButton>

              <IconButton
                size="small"
                onClick={() => onDelete(address)}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon="material-symbols:delete" fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            p: 3,
            width: '100%',
          }}
        >
          {!address.is_default ? (
            <Button
              size="small"
              variant="contained"
              color="success"
              loading={isLoading}
              onClick={() => onSetDefault(address)}
            >
              Definir como Padrão
            </Button>
          ) : (
            <Chip label="Padrão" color="primary" size="small" />
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
