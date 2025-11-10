import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { UserRole } from '@/shared/enums';
import Loading from '@/components/loading';
import { use0Auth } from '@/queries/use0Auth/use0Auth';
import { FIRST_ROUTES_USER, PATH_PAGE } from '@/routes/paths';
import { useAuthStore } from '@/stores/userAuth.store';

export function AuthCallback() {
  const [searchParams] = useSearchParams();
  const { isAuthenticated, user } = useAuthStore();

  const navigate = useNavigate();
  const { mutate, isPending, isSuccess, isError } = use0Auth();

  const code = searchParams.get('code');

  useEffect(() => {
    if (!code) {
      navigate(PATH_PAGE.page404);
      return;
    }
  }, [code, navigate]);

  useEffect(() => {
    if (code && !isPending && !isSuccess && !isError) {
      mutate(code);
    }
  }, [code, isPending, isSuccess, mutate, isError]);

  useEffect(() => {
    if (isSuccess && isAuthenticated() && user?.role) {
      navigate(FIRST_ROUTES_USER[user.role as UserRole], { replace: true });
    }
  }, [isAuthenticated, isSuccess, navigate, user?.role]);

  return <Loading mode="global" />;
}
