import { Button } from '@/components/ui/button';
import type { IFooter } from '@/views/Auth/interfaces/common';
import { useNavigate } from 'react-router-dom';

interface AccessFooterProps {
  footer: IFooter;
}

export function AccessFooter({ footer }: AccessFooterProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap items-center justify-center gap-0.5 text-center text-sm">
      {footer.message}
      <Button
        type="button"
        variant={'ghost'}
        className="hover:text-primary m-0 px-3 underline underline-offset-4"
        onClick={() => navigate(footer.redirectTo, { relative: 'path' })}
      >
        {footer.link}
      </Button>
    </div>
  );
}
