-- Finanças Pessoais — schema inicial
-- Rode este arquivo no SQL Editor do seu projeto Supabase (Dashboard > SQL Editor > New query).

-- Enums -----------------------------------------------------------------

create type transaction_type as enum ('receita', 'despesa');

create type transaction_category as enum (
  'Alimentação',
  'Transporte',
  'Moradia',
  'Lazer',
  'Saúde',
  'Educação',
  'Salário',
  'Freelance',
  'Outros'
);

-- Tabela ------------------------------------------------------------------

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  description text not null,
  amount numeric(12, 2) not null check (amount > 0),
  date date not null,
  type transaction_type not null,
  category transaction_category not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists transactions_user_date_idx
  on public.transactions (user_id, date desc);

-- Mantém updated_at em dia a cada UPDATE ----------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists transactions_set_updated_at on public.transactions;
create trigger transactions_set_updated_at
  before update on public.transactions
  for each row
  execute function public.set_updated_at();

-- Row Level Security -------------------------------------------------------
-- Cada usuário só acessa as próprias transações.

alter table public.transactions enable row level security;

create policy "Usuários podem ver as próprias transações"
  on public.transactions for select
  using (auth.uid() = user_id);

create policy "Usuários podem criar as próprias transações"
  on public.transactions for insert
  with check (auth.uid() = user_id);

create policy "Usuários podem editar as próprias transações"
  on public.transactions for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Usuários podem excluir as próprias transações"
  on public.transactions for delete
  using (auth.uid() = user_id);
