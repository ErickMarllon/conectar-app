import { useMemo } from 'react';

const normalizeValue = (value: any) => {
  if (Array.isArray(value)) return [...value].sort();
  if (!value || value === '' || value === null || value === undefined) return undefined;
  return value;
};
interface IDiffObjects<T> {
  diffForm: Partial<T>;
  diffCount: number;
  hasDiff: boolean;
}

interface IDiffProps<T> {
  original?: T | null;
  current?: T | null;
  propBase?: string[];
}
export function useDiffObjects<T extends Record<string, any>>({
  original = {} as T,
  current = {} as T,
  propBase = [],
}: IDiffProps<T>): IDiffObjects<T> {
  return useMemo(() => {
    if (!original || !current) return { diffForm: {}, diffCount: 0, hasDiff: false };

    const diffForm: Partial<T> = {};

    for (const key in current) {
      const typedKey = key as keyof T;
      const o = normalizeValue(original[typedKey]);
      const c = normalizeValue(current[typedKey]);
      if (propBase.includes(c as any) || propBase.includes(o as any)) {
        continue;
      }
      if (JSON.stringify(o) !== JSON.stringify(c)) {
        diffForm[typedKey] = normalizeValue(current[typedKey]);
      }
    }

    const diffCount = Object.keys(diffForm).length;
    const hasDiff = diffCount > 0;

    return { diffForm, diffCount, hasDiff };
  }, [original, current, propBase]);
}
