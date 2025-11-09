import { useCallback, type RefObject } from 'react';

interface ScrollOptions {
  behavior?: ScrollBehavior;
  offset?: number;
}

export function useScrollTo<T extends HTMLElement = HTMLElement>(
  options: ScrollOptions = { behavior: 'smooth', offset: 0 },
) {
  const { behavior = 'smooth', offset = 0 } = options;

  const scrollToTarget = useCallback(
    (target?: string | number | RefObject<T> | null | undefined) => {
      if (!target) return;

      if (typeof target === 'number') {
        window.scrollTo({ top: target + offset, behavior });
        return;
      }

      if (typeof target === 'string') {
        const element =
          document.querySelector<HTMLElement>(target) ||
          document.getElementById(target.replace(/^#/, ''));
        if (element) {
          const top = element.getBoundingClientRect().top + window.scrollY + offset;
          window.scrollTo({ top, behavior });
        }
        return;
      }

      if (target.current) {
        const top = target.current.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior });
      }
    },
    [behavior, offset],
  );

  return scrollToTarget;
}
