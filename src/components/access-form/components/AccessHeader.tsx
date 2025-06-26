import type { IAccessData } from '@/views/Auth/interfaces/auth';

interface AccessHeaderProps extends Pick<IAccessData, 'title' | 'subtitle'> {}

export function AccessHeader({ title, subtitle }: AccessHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-muted-foreground text-balance">{subtitle}</p>
    </div>
  );
}
