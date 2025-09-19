import type { IFormOptions } from '@/views/User/components/UserFilterDrawer';

export const formFindUsersFields: IFormOptions[] = [
  { name: 'first_name', label: 'Nome', type: 'text', placeholder: 'Digite o nome' },
  { name: 'last_name', label: 'Sobrenome', type: 'text', placeholder: 'Digite o sobrenome' },
  { name: 'email', label: 'Email', type: 'text', placeholder: 'Digite o e-mail' },
  {
    name: 'role',
    label: 'Função',
    placeholder: 'Selecione a Função',
    type: 'select',
    options: [
      { label: 'Selecione', value: 'all' },
      { label: 'Usuário', value: 'USER' },
      { label: 'Administrador', value: 'ADMIN' },
      { label: 'Funcionário', value: 'STAFF' },
      { label: 'Gerente', value: 'MANAGER' },
    ],
  },
  {
    name: 'is_verified',
    label: 'E-mail Verified',
    placeholder: 'Selecione',
    type: 'select',
    options: [
      { label: 'Selecione', value: '' },
      { label: 'Ativo', value: 'true' },
      { label: 'Bloqueado', value: 'false' },
    ],
  },
  {
    name: 'status',
    label: 'status',
    placeholder: 'Selecione',
    type: 'select',
    options: [
      { label: 'Selecione', value: 'all' },
      { label: 'Ativo', value: 'ACTIVE' },
      { label: 'pending', value: 'PENDING' },
      { label: 'banned', value: 'BANNED' },
    ],
  },
  { name: 'phone_number', label: 'Contato', type: 'text', placeholder: 'Digite o telefone' },
  { name: 'cpf', label: 'Cpf', type: 'text', placeholder: 'Digite o CPF' },
  { name: 'zip_code', label: 'Código postal', type: 'text', placeholder: 'Digite o Código postal' },
  { name: 'street', label: 'Rua', type: 'text', placeholder: 'Digite a Rua' },
  { name: 'city', label: 'Cidade', type: 'text', placeholder: 'Digite a cidade' },
  { name: 'state', label: 'Estado', type: 'text', placeholder: 'Digite a cidade' },
];
