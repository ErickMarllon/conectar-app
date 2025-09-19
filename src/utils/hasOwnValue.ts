export const hasOwnValue = <T = unknown>(obj?: T | null): boolean =>
  obj != null && (typeof obj !== 'object' || Object.keys(obj).length > 0);
