import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '@/stores/userAuth.store';
import type { UserRole } from '@/shared/enums';
import { PATH_AUTH, PATH_PAGE } from '@/routes/paths';
import { useEffect } from 'react';

type AuthGuardProps = {
  children: React.ReactNode;
  roles?: UserRole;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isAuthorized } = useAuthStore();
  const { pathname } = useLocation();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const newPathName = pathname.replace(`${slug}`, ':slug');

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate(PATH_AUTH.login, { replace: true });
    } else if (!isAuthorized(newPathName)) {
      navigate(PATH_PAGE.page403, { replace: true });
    }
  }, [isAuthenticated, isAuthorized, navigate, newPathName]);

  return <>{children}</>;
}
