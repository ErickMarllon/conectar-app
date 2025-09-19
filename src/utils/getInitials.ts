export function getUserInitials(firstSrt?: string, lastSrt?: string): string {
  const fullSrt = `${firstSrt ?? ''} ${lastSrt ?? ''}`.trim();

  if (!fullSrt) return '';

  const parts = fullSrt.split(' ').filter((p) => p.trim().length > 0);

  if (parts.length >= 2) {
    const firstInitial = parts[0][0].toUpperCase();
    const lastInitial = parts[parts.length - 1][0].toUpperCase();
    return `${firstInitial}${lastInitial}`;
  }

  const solo = parts[0];
  return solo.slice(0, 2).toUpperCase();
}
