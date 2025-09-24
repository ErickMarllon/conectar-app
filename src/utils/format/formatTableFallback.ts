export function fTableFallback(value: unknown, hyphenCount = 1): string {
  if (value === null || value === undefined || value === '') {
    return '-'.repeat(hyphenCount);
  }
  return String(value);
}
