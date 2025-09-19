// auth
import GuestGuard from '@/guard/GuestGuard';
// sections
import Login from './components/Login';
// import Login from '@/sections/auth/LoginAuth0';

// ----------------------------------------------------------------------

export function LoginPage() {
  return (
    <GuestGuard>
      <Login />
    </GuestGuard>
  );
}
