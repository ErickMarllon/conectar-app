import Register from './components/Register';
import GuestGuard from '@/guard/GuestGuard';

export function RegisterPage() {
  return (
    <GuestGuard>
      <Register />
    </GuestGuard>
  );
}
