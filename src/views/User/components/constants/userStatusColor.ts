export const statusColorMap: Record<string, 'error' | 'warning' | 'success' | 'default'> = {
  BANNED: 'error',
  PENDING: 'warning',
  ACTIVE: 'success',
  DEFAULT: 'default',
};
export const statusColoBooleanMap: Record<string, 'error' | 'warning' | 'success'> = {
  false: 'error',
  true: 'success',
};
