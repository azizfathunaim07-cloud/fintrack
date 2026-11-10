create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  created_at timestamptz default now()
);

create table if not exists public.wallets (
  id uuid primary key default '00000000-0000-0000-0000-000000000001'::uuid,
  name text not null default 'Dompet Utama',
  created_at timestamptz default now()
);

insert into public.wallets (id, name)
values ('00000000-0000-0000-0000-000000000001', 'Dompet Utama')
on conflict (id) do nothing;

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  wallet_id uuid not null default '00000000-0000-0000-0000-000000000001'::uuid references public.wallets (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  type text not null check (type in ('income', 'expense')),
  category text not null,
  description text not null,
  amount numeric(12,2) not null check (amount > 0),
  date date not null default current_date,
  created_at timestamptz default now()
);

create table if not exists public.budgets (
  id uuid primary key default gen_random_uuid(),
  wallet_id uuid not null default '00000000-0000-0000-0000-000000000001'::uuid references public.wallets (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  month text not null,
  category text not null,
  type text not null check (type in ('income', 'expense')),
  amount numeric(12,2) not null check (amount > 0),
  note text default '',
  created_at timestamptz default now()
);

alter table public.transactions
  add column if not exists wallet_id uuid;

update public.transactions
set wallet_id = '00000000-0000-0000-0000-000000000001'::uuid
where wallet_id is null;

alter table public.transactions
  alter column wallet_id set default '00000000-0000-0000-0000-000000000001'::uuid;

alter table public.transactions
  alter column wallet_id set not null;

alter table public.profiles enable row level security;
alter table public.wallets enable row level security;
alter table public.transactions enable row level security;
alter table public.budgets enable row level security;

create policy "Wallets are viewable by authenticated users"
  on public.wallets for select
  using (auth.role() = 'authenticated');

create policy "Wallets can be inserted by authenticated users"
  on public.wallets for insert
  with check (auth.role() = 'authenticated');

create policy "Profiles are viewable by authenticated users"
  on public.profiles for select
  using (auth.role() = 'authenticated');

create policy "Profiles are updatable by owner"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Profiles can be inserted by owner"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Transactions are viewable by authenticated users in the shared wallet"
  on public.transactions for select
  using (auth.role() = 'authenticated' and wallet_id = '00000000-0000-0000-0000-000000000001'::uuid);

create policy "Transactions can be inserted by authenticated users to the default wallet"
  on public.transactions for insert
  with check (auth.uid() = user_id and wallet_id = '00000000-0000-0000-0000-000000000001'::uuid);

create policy "Budgets are viewable by authenticated users in the shared wallet"
  on public.budgets for select
  using (auth.role() = 'authenticated' and wallet_id = '00000000-0000-0000-0000-000000000001'::uuid);

create policy "Budgets can be inserted by owner"
  on public.budgets for insert
  with check (auth.uid() = user_id and wallet_id = '00000000-0000-0000-0000-000000000001'::uuid);

create policy "Budgets can be updated by owner"
  on public.budgets for update
  using (auth.uid() = user_id);

create policy "Budgets can be deleted by owner"
  on public.budgets for delete
  using (auth.uid() = user_id);

create policy "Transactions can be updated by owner"
  on public.transactions for update
  using (auth.uid() = user_id);

create policy "Transactions can be deleted by owner"
  on public.transactions for delete
  using (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
