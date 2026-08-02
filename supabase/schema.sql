-- Blog engagement schema: run once in the Supabase SQL editor.
-- Security model: the anon key + these RLS policies. No service-role key is used anywhere.
-- Likes are anonymous: de-duplicated per browser via a random visitor_id
-- stored in an httpOnly cookie (see lib/actions.js), not a user account.

-- Likes: the composite primary key is the one-like-per-visitor-per-post constraint.
create table public.likes (
  slug text not null,
  visitor_id uuid not null,
  created_at timestamptz not null default now(),
  primary key (slug, visitor_id)
);

alter table public.likes enable row level security;

create policy "likes are public" on public.likes for select using (true);
create policy "anyone can like"   on public.likes for insert to anon, authenticated with check (true);
create policy "anyone can unlike" on public.likes for delete to anon, authenticated using (true);

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
