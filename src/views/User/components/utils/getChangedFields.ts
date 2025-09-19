import { isEqual } from 'lodash';

export const getChangedFields = <T extends { id?: string }>(
  original?: T | null,
  current?: T | null,
): Partial<T> => {
  if (!original || !current) return {};
  const changes: Partial<T> = {};

  for (const key in current) {
    if (Object.prototype.hasOwnProperty.call(current, key)) {
      const typedKey = key as keyof T;
      const currVal = current[typedKey];

      const cleanCurr = currVal === null ? undefined : currVal;

      const origVal = original[typedKey];

      if (!isEqual(origVal, cleanCurr)) {
        changes[typedKey as keyof T] = cleanCurr as any;
      }
    }
  }
  return { ...changes, id: current.id };
};
