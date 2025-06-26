import { terms } from '@/views/Auth/constants/common';

export function AccessTerms() {
  return (
    <div className="text-muted-foreground flex flex-wrap justify-center gap-0.5 text-center text-xs text-balance">
      {terms.prefix}
      <a
        className="hover:text-primary underline underline-offset-4"
        href="#"
        onClick={() => alert('has not yet been implemented')}
      >
        {terms.tos}
      </a>
      {terms.and}
      <a
        className="hover:text-primary underline underline-offset-4"
        href="#"
        onClick={() => alert('has not yet been implemented')}
      >
        {terms.privacy}
      </a>
    </div>
  );
}
