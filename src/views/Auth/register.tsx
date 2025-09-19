// auth
import GuestGuard from '@/guard/GuestGuard';
// sections
import Register from './components/Register';

// ----------------------------------------------------------------------

export function RegisterPage() {
  return (
    <GuestGuard>
      <Register />
    </GuestGuard>
  );
}
