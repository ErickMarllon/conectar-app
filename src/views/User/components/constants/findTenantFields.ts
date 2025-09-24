import type { IFormOptions } from '@/components/FilterDrawer';

export const formFindTenantFields: IFormOptions[] = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Digite o nome' },
  { name: 'email', label: 'Email', type: 'text', placeholder: 'Digite o e-mail' },
  { name: 'phone_number', label: 'Phone Number', type: 'text', placeholder: 'Digite o telefone' },
  { name: 'whatsapp', label: 'Whatsapp', type: 'text', placeholder: 'Digite o CPF' },
  { name: 'zip_code', label: 'Código postal', type: 'text', placeholder: 'Digite o Código postal' },
  { name: 'street', label: 'Rua', type: 'text', placeholder: 'Digite a Rua' },
  { name: 'city', label: 'Cidade', type: 'text', placeholder: 'Digite a cidade' },
  { name: 'state', label: 'Estado', type: 'text', placeholder: 'Digite a cidade' },
];
