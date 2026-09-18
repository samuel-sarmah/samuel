-- Run once in the Supabase SQL editor.
-- Security model: the anon key + these RLS policies. No service-role key is used anywhere.

-- Contact form: anyone may send a message; nobody may read them through the
-- API (no select policy), so the inbox lives in the Supabase dashboard.
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 200),
  message text not null check (char_length(message) between 1 and 5000),
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

create policy "anyone can send a message" on public.contact_messages
  for insert to anon, authenticated with check (true);
