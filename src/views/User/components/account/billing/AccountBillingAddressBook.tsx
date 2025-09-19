// @mui
import { Box, Card, Button, Typography, Stack, Divider } from '@mui/material';
// @types
import type { IUserAccountBillingAddress } from '@/shared/interfaces/IUser';
// components
import Iconify from '@/components/iconify';
import { useUserDeleteAddress } from '@/queries/user/address/delete/useUserDeleteAddress';
import { useUserPathAddress } from '@/queries/user/address/path/useUserPathAddress';
import { toast } from 'react-toastify';
import ConfirmDialog from '@/components/confirm-dialog';
import { useEffect, useState } from 'react';
import { AddressFormDialog } from '../../AddressFormDialog';
import { useForm } from 'react-hook-form';
import { addressUserSchema, type IUserAddress } from '@/schemas/address-user-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { fetchAddressByZip } from '@/services/fetchAddressByZip';
import type { IAddressSchema } from '@/schemas/address-schema';

// ----------------------------------------------------------------------

type Props = {
  addressBook?: IUserAccountBillingAddress[];
  userId?: string;
};

export default function AccountBillingAddressBook({ addressBook, userId }: Props) {
  const { mutate: handleDelete, isPending: isLoadingDelete } = useUserDeleteAddress();
  const { mutate: handlePath, isPending: isLoadingPath } = useUserPathAddress();
  const isLoading = isLoadingDelete || isLoadingPath;

  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [addressState, setAddressState] = useState<IAddressSchema | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDeleteAddress = () => {
    if (addressState && addressState?.id) {
      handleDelete(addressState.id, {
        onSuccess: () => {
          toast.success('Delete success!');
        },
        onError: () => {
          toast.error('Delete failed!');
        },
      });
      setOpenConfirm(false);
    }
  };

  const handleOpenConfirm = (address: IAddressSchema) => {
    setAddressState(address);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setAddressState(null);
    setOpenConfirm(false);
  };

  const methods = useForm<IUserAddress>({
    resolver: zodResolver(addressUserSchema),
  });

  const { watch, reset, setValue } = methods;

  const address = watch('address');
  const onSubmit = () => {
    console.log('teste');
    if (!userId) return;
    return handlePath(
      {
        user_id: userId,
        address,
      },
      {
        onSuccess: () => {
          toast.success('Update success!');
          setOpenDialog(false);
        },
        onError: () => {
          toast.error('Update failed!');
        },
      },
    );
  };

  const handleEditAddress = (address?: IAddressSchema) => {
    reset({
      user_id: userId,
      address: { ...address, is_default: address?.is_default ?? true },
    });
    setAddressState(address ?? null);
    setOpenDialog(true);
  };
  const zip_code = watch('address.zip_code');

  useEffect(() => {
    if (zip_code && zip_code.length >= 8) {
      fetchAddressByZip(zip_code).then((addr) => {
        if (addr) {
          setValue('address.street', addr.street || '');
          setValue('address.complement', addr.complement || '');
          setValue('address.city', addr.city || '');
          setValue('address.state', addr.state || '');
          setValue('address.country', addr.country || '');
        }
      });
    }
  }, [zip_code, setValue]);

  const addressesOrdenad = [...(addressBook ?? [])].sort(
    (a, b) => (b.is_default ? 1 : 0) - (a.is_default ? 1 : 0),
  );
  return (
    <Card sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
        <Typography variant="overline" sx={{ color: 'text.secondary' }}>
          Billing Info
        </Typography>

        <Button
          size="small"
          onClick={() => handleEditAddress()}
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New Billing Address
        </Button>
      </Stack>

      <Stack spacing={3} divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
        {addressesOrdenad?.map((address) => (
          <Stack key={address.id} spacing={1}>
            {/* <Typography variant="subtitle1">{address.name}</Typography> */}

            <Typography variant="body2">
              <Box component="span" sx={{ color: 'text.secondary', mr: 0.5 }}>
                Address:
              </Box>
              {`${address.street}, ${address.city}, ${address.state}, ${address.country} ${address.zip_code}`}
            </Typography>

            {address?.phone_number && (
              <Typography variant="body2">
                <Box component="span" sx={{ color: 'text.secondary', mr: 0.5 }}>
                  Phone:
                </Box>
                {address.phone_number}
              </Typography>
            )}

            <Stack direction="row" spacing={1}>
              <Button
                color="error"
                onClick={() => handleOpenConfirm(address)}
                size="small"
                startIcon={<Iconify icon="eva:trash-2-outline" />}
                loading={isLoading}
              >
                Delete
              </Button>

              <Button
                size="small"
                onClick={() => handleEditAddress(address)}
                startIcon={<Iconify icon="eva:edit-fill" />}
              >
                Edit
              </Button>
            </Stack>
          </Stack>
        ))}
      </Stack>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={handleDeleteAddress}>
            Delete
          </Button>
        }
      />
      <AddressFormDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        methods={methods}
        onSubmit={onSubmit}
        editingAddress={addressState}
      />
    </Card>
  );
}
