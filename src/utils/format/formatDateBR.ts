export function formatDateBR(
  date?: string | Date,
  options?: Intl.DateTimeFormatOptions,
): string | undefined {
  if (!date) return undefined;

  const optionsDefault = { day: '2-digit', month: 'short', year: 'numeric' } as const;
  return new Date(date).toLocaleDateString('pt-BR', { ...optionsDefault, ...options });
}
