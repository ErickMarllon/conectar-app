import Register from './components/Register';
import GuestGuard from '@/guard/GuestGuard';

export default function RegisterPage() {
  return (
    <GuestGuard>
      <Register />
    </GuestGuard>
  );
}
