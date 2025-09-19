export function formatFullName(firstName?: string, lastName?: string): string {
  const capitalize = (text?: string) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : '';

  const first = capitalize(firstName);
  const last = capitalize(lastName);

  return [first, last].filter(Boolean).join(' ');
}
