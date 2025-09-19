// type UserChanges = Omit<Partial<T>, 'avatar' | 'is_verified' | 'isPublic'> & {
//   avatar?: string | undefined;
//   is_verified?: never;
//   isPublic?: never;
// };

const normalizeArray = (arr: any[]) => (Array.isArray(arr) ? [...arr].sort() : arr);

export const diffObjects = <T extends Record<string, any>>(
  original?: T | null,
  current?: T | null,
) => {
  if (!original || !current) return {};
  const diff: Partial<T> = {};

  for (const key in current) {
    const o = normalizeArray(original[key]);
    const c = normalizeArray(current[key]);

    if (JSON.stringify(o) !== JSON.stringify(c)) {
      diff[key] = current[key];
    }
  }

  return diff;
};
