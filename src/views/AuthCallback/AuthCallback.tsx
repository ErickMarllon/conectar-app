import { useRedirectAfterLogin } from '@/hooks/useRedirectAfterAuth';
import { use0Auth } from '@/queries/use0Auth/use0Auth';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function AuthCallback() {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const { mutate, data } = use0Auth();
  useRedirectAfterLogin(data?.data);

  const code = searchParams.get('code');
  const redirectUrl = searchParams.get('redirect_url');

  useEffect(() => {
    if (!code || !redirectUrl) {
      navigate('/');
      return;
    }

    mutate(code);
  }, [code, redirectUrl, mutate, navigate]);

  return <p>Autenticando...</p>;
}
