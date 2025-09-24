import ConfirmDialog from '@/components/confirm-dialog';
import Iconify from '@/components/iconify';
import Loading from '@/components/loading';
import { useFetchAddressByZip } from '@/hooks/useAddressByZip';
import { useTenantPathAddress } from '@/queries/tenant/address/path/useTenantPathAddress';
import { useUserDeleteAddress } from '@/queries/user/address/delete/useUserDeleteAddress';
import { useUserPathAddress } from '@/queries/user/address/path/useUserPathAddress';
import type { IAddressSchema } from '@/schemas/address-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AddressFormDialog } from './AddressFormDialog';
import { addressPayloadSchema, type IAddressPayloadSchema } from '@/schemas/address-payload-schema';
import { AddressCard } from './cards';

interface Props {
  user_id?: string;
  tenant_id?: string;
  addresses?: IAddressSchema[];
  isEdit?: boolean;
}

export default function AddressManager({ user_id, tenant_id, addresses }: Props) {
  const [address, setAddress] = useState<IAddressSchema | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAddress, setEditingAddress] = useState<IAddressSchema | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const { mutate: handlePath, isPending: isLoadingPath } = useUserPathAddress({ user_id });
  const { mutate: handlePathTenant, isPending: isLoadingPathTenant } = useTenantPathAddress({
    tenant_id,
  });
  const { mutate: handleDelete, isPending: isLoadingDelete } = useUserDeleteAddress();
  const isLoading = isLoadingPath || isLoadingDelete || isLoadingPathTenant;

  const methods = useForm<IAddressPayloadSchema>({
    resolver: zodResolver(addressPayloadSchema),
  });

  const { watch, setValue, reset, trigger } = methods;

  const handleOpenConfirm = (address: IAddressSchema) => {
    setAddress(address);
    setOpenConfirm(true);
  };

  const handleDeleteAddress = () => {
    if (address && address?.id) {
      handleDelete(address.id);
      setOpenConfirm(false);
    }
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleAddAddress = () => {
    if (!user_id && !tenant_id) return;

    reset({
      user_id,
      tenant_id,
      address: {
        is_default: true,
      },
    });

    setEditingAddress(null);
    setOpenDialog(true);
  };

  const handleEditAddress = (address: IAddressSchema) => {
    if (!user_id && !tenant_id) return;

    reset({
      user_id,
      tenant_id,
      address,
    });

    setEditingAddress(address);
    setOpenDialog(true);
  };

  const onSubmit = async () => {
    const address = watch('address');
    if (!(await trigger())) return;

    const payload = { user_id, tenant_id, address };

    const callbacks = {
      onSuccess: () => {
        toast.success(address ? 'Create success!' : 'Update success!');
        setOpenDialog(false);
      },
      onError: () => {
        toast.error('Update failed!');
      },
    };

    const action = user_id ? handlePath : handlePathTenant;

    return action(payload, callbacks);
  };

  const handleSetDefault = (address: IAddressSchema) => {
    if (!user_id && !tenant_id) return;

    const payload = {
      user_id,
      tenant_id,
      address: {
        ...address,
        is_default: true,
      },
    };

    const action = user_id ? handlePath : handlePathTenant;
    return action(payload);
  };

  const addressesOrdenad = [...(addresses ?? [])].sort(
    (a, b) => (b.is_default ? 1 : 0) - (a.is_default ? 1 : 0),
  );

  const formValues = watch();

  const { fetchAddress } = useFetchAddressByZip();

  const handleFocusZipCode = useCallback(
    async (showToast?: boolean) => {
      fetchAddress({
        zip: formValues?.address?.zip_code,
        showToast,
      }).then((addr) => {
        if (addr) {
          const updateAddress = {
            ...formValues?.address,
            ...addr,
          };
          setValue('address', updateAddress as IAddressSchema);
        }
      });
    },
    [fetchAddress, formValues?.address, setValue],
  );

  return (
    <Box sx={{ py: 3 }}>
      {isLoading && !openDialog && <Loading mode="global" />}

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Endereços</Typography>
        <Button
          variant="contained"
          color="success"
          startIcon={<Iconify icon="material-symbols:add" />}
          onClick={handleAddAddress}
          loading={isLoading}
          sx={{
            '& .MuiButton-icon': { mr: 0.25 },
          }}
        >
          Adicionar Endereço
        </Button>
      </Box>

      <Grid
        container
        rowGap={3}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
        }}
      >
        {addressesOrdenad?.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            onEdit={handleEditAddress}
            onDelete={handleOpenConfirm}
            onSetDefault={handleSetDefault}
            isLoading={isLoading}
          />
        ))}
      </Grid>

      <AddressFormDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onBlur={() => handleFocusZipCode()}
        methods={methods}
        onSubmit={onSubmit}
        isLoading={isLoading && openDialog}
        editingAddress={editingAddress}
      />

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
    </Box>
  );
}
