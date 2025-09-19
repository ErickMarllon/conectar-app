export function getAutoComplete(type: string, name: string): string {
  switch (type) {
    case 'email':
      return 'email';
    case 'password':
      return name.includes('new') ? 'new-password' : 'current-password';
    case 'tel':
      return 'tel';
    case 'text':
    default:
      if (name.includes('first')) return 'given-name';
      if (name.includes('last')) return 'family-name';
      if (name.includes('name')) return 'name';
      return 'on';
  }
}
