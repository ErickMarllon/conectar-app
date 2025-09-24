import { useMemo } from 'react';

const normalizeArray = (arr: any[]) => (Array.isArray(arr) ? [...arr].sort() : arr);

interface IDiffObjects<T> {
  diffForm: Partial<T>;
  diffCount: number;
  hasDiff: boolean;
}

export const diffObjects = <T extends Record<string, any>>(
  original?: T | null,
  current?: T | null,
): IDiffObjects<T> => {
  if (!original || !current) return { diffForm: {}, diffCount: 0, hasDiff: false };
  const diffForm: Partial<T> = {};

  for (const key in current) {
    const o = normalizeArray(original[key]);
    const c = normalizeArray(current[key]);

    if (JSON.stringify(o) !== JSON.stringify(c)) {
      diffForm[key] = current[key];
    }
  }
  const diffCount = Object.keys(diffForm).length;
  const hasDiff = diffCount > 0;

  return { diffForm, diffCount, hasDiff };
};
export function useDiffObjects<T extends Record<string, any>>(
  original?: T | null,
  current?: T | null,
): IDiffObjects<T> {
  return useMemo(() => {
    if (!original || !current) return { diffForm: {}, diffCount: 0, hasDiff: false };

    const diffForm: Partial<T> = {};

    for (const key in current) {
      const typedKey = key as keyof T;
      const o = normalizeArray(original[typedKey]);
      const c = normalizeArray(current[typedKey]);

      if (JSON.stringify(o) !== JSON.stringify(c)) {
        diffForm[typedKey] = current[typedKey];
      }
    }

    const diffCount = Object.keys(diffForm).length;
    const hasDiff = diffCount > 0;

    return { diffForm, diffCount, hasDiff };
  }, [original, current]);
}
