import { useEffect } from 'react';

// routes
import { PATH_DASHBOARD } from '@/routes/paths';
import { useNavigate, useParams } from 'react-router-dom';

// routes

// ----------------------------------------------------------------------

export function UserPage() {
  const { pathname } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === PATH_DASHBOARD.user.root) {
      navigate(PATH_DASHBOARD.user.profile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
