# Finanças Pessoais

App de gestão financeira pessoal: registre receitas e despesas, categorize, veja um dashboard com resumo mensal e gráfico por categoria, filtre e exporte suas transações em CSV.

**Stack**: Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Supabase (Auth + Postgres + Row Level Security) + Recharts.

## Setup do Supabase

O app precisa de um projeto Supabase com o schema do banco já criado. Siga os passos:

1. Crie uma conta e um novo projeto em [supabase.com](https://supabase.com).
2. No painel do projeto, abra **SQL Editor** → **New query**, cole o conteúdo de [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql) e clique em **Run**. Isso cria a tabela `transactions`, os enums de tipo/categoria e as políticas de Row Level Security (cada usuário só enxerga suas próprias transações).
3. Em **Project Settings → API**, copie a **Project URL** e a chave **anon public**.
4. Copie `.env.example` para `.env.local` e preencha:

   ```bash
   cp .env.example .env.local
   ```

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```

5. (Opcional) Em **Authentication → Providers → Email**, desative "Confirm email" durante o desenvolvimento para poder logar imediatamente após o cadastro sem precisar confirmar por e-mail.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Estrutura do projeto

```
app/                    rotas (App Router)
  (auth)/               login, cadastro
  (app)/                área autenticada: dashboard, transações
components/
  ui/                   componentes shadcn/ui
  layout/               sidebar, topbar
  dashboard/            cards de resumo, gráfico de categorias
  transactions/         formulário, tabela, filtros, exportação CSV
lib/
  supabase/             clients Supabase (browser/server) e helper do proxy
  actions/              Server Actions (auth, transações)
  categories.ts         categorias pré-definidas
  csv.ts                exportação para CSV
supabase/migrations/    schema SQL
types/                  tipos TypeScript (Transaction)
proxy.ts                protege rotas autenticadas (equivalente ao middleware)
```

## Deploy na Vercel

1. Suba o projeto para um repositório no GitHub (já feito, se você seguiu este guia com o Claude Code).
2. Em [vercel.com](https://vercel.com), clique em **Add New → Project** e importe o repositório. A Vercel detecta automaticamente que é um projeto Next.js.
3. Antes de clicar em **Deploy**, configure as variáveis de ambiente (**Environment Variables**) com os mesmos valores do seu `.env.local`:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```

4. Clique em **Deploy**. A build usa `next build` automaticamente; ao final você recebe uma URL pública (`https://seu-projeto.vercel.app`).
5. **Importante**: no painel do Supabase, vá em **Authentication → URL Configuration** e adicione a URL da Vercel em **Site URL** e em **Redirect URLs**. Sem isso, fluxos de autenticação que dependem de redirecionamento (como confirmação de e-mail, se você reativar essa opção) não vão funcionar em produção.
6. Deploys seguintes são automáticos: todo `git push` para a branch `main` dispara um novo deploy na Vercel (integração contínua via GitHub).
