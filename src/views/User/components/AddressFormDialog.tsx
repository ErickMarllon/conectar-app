import FormProvider from '@/components/hook-form';
import Loading from '@/components/loading';
import type { IAddressSchema } from '@/schemas/address-schema';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { AddressForm } from './AddressForm';

export function AddressFormDialog({
  open,
  onClose,
  methods,
  onSubmit,
  onFocus,
  onBlur,
  isLoading,
  editingAddress,
}: {
  open: boolean;
  onClose: VoidFunction;
  methods: any;
  onSubmit: VoidFunction;
  editingAddress: IAddressSchema | null;
  onFocus?: VoidFunction;
  onBlur?: VoidFunction;
  isLoading?: boolean;
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      {isLoading && <Loading mode="modal" />}
      <FormProvider methods={methods} key={editingAddress?.id ?? 'new-user-address'}>
        <DialogTitle>{editingAddress ? 'Editar Endereço' : 'Adicionar Novo Endereço'}</DialogTitle>
        <DialogContent>
          <AddressForm onFocus={onFocus} onBlur={onBlur} />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} sx={{ color: 'grey.400' }}>
            Cancelar
          </Button>
          <Button variant="contained" type="button" onClick={onSubmit} color="success">
            {editingAddress ? 'Salvar' : 'Adicionar'}
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
