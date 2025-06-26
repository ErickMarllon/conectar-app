import { useUserById } from '@/queries/useUser/useListUsers';
import { useDashboardUserModal } from '@/views/Dashboard/context/use-dashboard.context';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { ProfileForm } from './user-form';

export function UserFormModal() {
  const { modalProps, closeModal } = useDashboardUserModal();
  const { data } = useUserById(modalProps?.userId);
  const isOpen = modalProps?.newUser || modalProps?.userId ? true : false;

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-h-[500px] overflow-hidden hover:overflow-auto sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar usuário</DialogTitle>
          <DialogDescription>Atualize as informações do usuário aqui.</DialogDescription>
        </DialogHeader>
        <ProfileForm userData={data} />
      </DialogContent>
    </Dialog>
  );
}
