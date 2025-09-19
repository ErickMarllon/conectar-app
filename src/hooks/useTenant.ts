import { useParams, useSearchParams } from 'react-router-dom';

export const useTenant = (): string | null => {
  const params = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();

  return params.slug || searchParams.get('tenant') || null;
};
