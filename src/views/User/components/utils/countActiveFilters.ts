export const countActiveFilters = (filters?: any) => {
  if (!filters) return 0;

  return Object.values(filters).filter((value) => {
    if (value === undefined || value === null) return false;
    if (typeof value === 'string' && value.trim() === '') return false;
    if (Array.isArray(value) && value.length === 0) return false;
    return true;
  }).length;
};
