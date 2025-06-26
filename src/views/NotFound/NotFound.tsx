import { Button } from '@/components/ui/button';
import { useNavigate, useNavigationType } from 'react-router-dom';

export function NotFound() {
  const navigate = useNavigate();
  const navType = useNavigationType();

  const handleGoBack = () => {
    if (navType === 'POP' || navType === 'PUSH') {
      navigate('/');
    } else {
      navigate(-1);
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12 text-center">
      <div className="max-w-md">
        <h1 className="text-primary mb-4 text-6xl font-bold tracking-tight">404</h1>
        <h2 className="mb-2 text-2xl font-semibold">Page not found</h2>
        <p className="text-muted-foreground mb-6">
          The page you are trying to access does not exist or you don&apos;t have permission.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button variant="default" onClick={handleGoBack}>
            Go back
          </Button>
          <Button variant="outline" onClick={() => navigate('/')}>
            Go to home
          </Button>
        </div>
      </div>
    </div>
  );
}
