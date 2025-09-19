export function removeEmpty<T extends object>(obj?: T): Partial<T> {
  if (!obj) return {};

  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== undefined && value !== null),
  ) as Partial<T>;
}
