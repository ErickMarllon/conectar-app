import Login from './components/Login';
import GuestGuard from '@/guard/GuestGuard';

export function LoginPage() {
  return (
    <GuestGuard>
      <Login />
    </GuestGuard>
  );
}
