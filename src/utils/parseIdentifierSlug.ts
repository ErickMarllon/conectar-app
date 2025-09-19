export type IdentifierResult = { id?: string; name?: string };

export function parseIdentifier(input?: string): IdentifierResult {
  if (!input || input === ':slug') return {};
  const cleanInput = input.trim();

  return { id: cleanInput, name: cleanInput };
}
