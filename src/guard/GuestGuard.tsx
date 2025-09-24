import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/userAuth.store';
import { FIRST_ROUTES_USER } from '@/routes/paths';

type GuestGuardProps = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated() && user?.role) {
      navigate(FIRST_ROUTES_USER[user.role], { replace: true });
    }
  }, [isAuthenticated, navigate, user?.role]);

  return <>{children}</>;
}
