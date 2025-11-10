import Login from './components/Login';
import GuestGuard from '@/guard/GuestGuard';

export default function LoginPage() {
  return (
    <GuestGuard>
      <Login />
    </GuestGuard>
  );
}
