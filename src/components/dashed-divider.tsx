import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

interface DashedDividerProps extends HTMLAttributes<HTMLDivElement> {
  maxWidth?: string;
}

export function DashedDivider({
  maxWidth = 'max-w-14',
  className = '',
  ...rest
}: DashedDividerProps) {
  return (
    <div
      className={cn(
        'flex h-4 items-center justify-center gap-2 overflow-hidden',
        maxWidth,
        className,
      )}
      {...rest}
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <span key={i} className="text-sidebar-accent-foreground/60 whitespace-nowrap">
          -
        </span>
      ))}
    </div>
  );
}
