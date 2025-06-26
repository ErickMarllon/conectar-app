# Conectar App

Aplicação web desenvolvida em React + TypeScript, utilizando Vite, React Hook Form, Zod, React Query, TailwindCSS e outras tecnologias modernas. O objetivo é fornecer uma base robusta para sistemas administrativos, com autenticação, gerenciamento de usuários e interface responsiva.

---

## Índice

- [Links do Projeto Conectar](#links-do-projeto-conectar)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Configuração de Ambiente](#configuração-de-ambiente)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Principais Funcionalidades](#principais-funcionalidades)
- [Padrões e Boas Práticas](#padrões-e-boas-práticas)
- [Licença](#licença)

---

## Links do Projeto Conectar

### Front-end

**Repositório do código fonte:**  
[https://github.com/ErickMarllon/conectar-app](https://github.com/ErickMarllon/conectar-app)

**Aplicação hospedada na Vercel:**

- [https://conectar-app.vercel.app](https://conectar-app.vercel.app)
- [https://conectar-app-erickmarllons-projects.vercel.app](https://conectar-app-erickmarllons-projects.vercel.app)
- [https://conectar-app-git-main-erickmarllons-projects.vercel.app](https://conectar-app-git-main-erickmarllons-projects.vercel.app)
- [https://conectar-kyiijwg4f-erickmarllons-projects.vercel.app](https://conectar-kyiijwg4f-erickmarllons-projects.vercel.app)

---

### Back-end

**Repositório do código fonte:**  
[https://github.com/ErickMarllon/conectar-api](https://github.com/ErickMarllon/conectar-api)

**API hospedada na Render:**  
[https://conectar-api-1wos.onrender.com](https://conectar-api-1wos.onrender.com)

**Documentação Swagger da API:**  
[https://conectar-api-1wos.onrender.com/api-docs#](https://conectar-api-1wos.onrender.com/api-docs#)

---

## Tecnologias Utilizadas

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [React Query (TanStack)](https://tanstack.com/query/latest)
- [TailwindCSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Axios](https://axios-http.com/)
- [date-fns](https://date-fns.org/)
- [React Router DOM](https://reactrouter.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [ESLint + Prettier](https://eslint.org/)
- [Lucide Icons](https://lucide.dev/)

---

## Requisitos

- Node.js v18+
- npm v9+ ou yarn/pnpm
- Backend disponível em `VITE_API_URL` (ver `.env`)

---

## Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/ErickMarllon/conectar-app.git
   cd conectar-app
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

---

## Configuração de Ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo (ajuste conforme necessário):

```env
VITE_APP_URL=http://localhost:5170
VITE_APP_TZ=America/Sao_Paulo
VITE_API_URL=http://localhost:3000/api
```

- **VITE_API_URL**: URL da API backend.
- **VITE_APP_TZ**: Timezone padrão.
- **VITE_APP_URL**: Origem para CORS (opcional).

---

## Scripts Disponíveis

- `npm run dev` — Inicia o servidor de desenvolvimento Vite.
- `npm run build` — Gera a build de produção.
- `npm run preview` — Visualiza a build de produção localmente.
- `npm run lint` — Executa o ESLint.

---

## Estrutura de Pastas

```
src/
  components/         # Componentes reutilizáveis (UI, formulários, tabelas, etc)
  contexts/           # Contextos React (ex: autenticação)
  errors/             # Tratamento de erros e tipos
  hooks/              # Custom hooks
  http/               # Configuração do Axios/API
  layout/             # Layouts de página
  lib/                # Funções utilitárias
  queries/            # React Query hooks
  routes/             # Rotas protegidas e públicas
  services/           # Serviços de integração com API
  shared/             # Tipos, enums, constantes
  views/              # Páginas principais
  assets/             # Imagens e SVGs
```

---

## Principais Funcionalidades

- **Autenticação**: Login, cadastro, OAuth, refresh token, logout.
- **Gerenciamento de Usuários**: CRUD de usuários, formulário dinâmico, validação com Zod.
- **Interface Responsiva**: Sidebar, header, tabelas, paginação.
- **Feedback ao Usuário**: Toasts de sucesso/erro.
- **Validação de Formulários**: React Hook Form + Zod.
- **Integração com API**: Axios com interceptors, React Query para cache e mutations.
- **Padronização Visual**: TailwindCSS, Radix UI, Lucide Icons.

---

## Padrões e Boas Práticas

- **TypeScript Estrito**: Tipagem forte em todo o projeto.
- **Componentização**: Componentes reutilizáveis e desacoplados.
- **Validação Centralizada**: Schemas Zod para todos os formulários.
- **Gerenciamento de Estado**: Context API para autenticação, React Query para dados remotos.
- **Organização de Pastas**: Separação clara por domínio e responsabilidade.
- **Lint e Prettier**: Código limpo e padronizado.

---

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## Contato

Dúvidas ou sugestões? Abra uma issue ou entre em contato pelo
