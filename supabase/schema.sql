-- Blog engagement schema: run once in the Supabase SQL editor.
-- Security model: the anon key + these RLS policies. No service-role key is used anywhere.

-- Public mirror of auth.users so comments can show a name/avatar
-- without exposing the auth schema.
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  avatar_url text
);

-- Auto-create a profile on sign-up. Google provides full_name/avatar_url;
-- GitHub provides user_name/avatar_url; magic-link users fall back to the
-- local part of their email.
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'user_name',
      split_part(new.email, '@', 1)
    ),
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Comments, keyed by the post's slug (posts live as markdown in the repo).
create table public.comments (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  user_id uuid not null references public.profiles (id) on delete cascade,
  body text not null check (char_length(body) between 1 and 2000),
  created_at timestamptz not null default now()
);
create index comments_slug_idx on public.comments (slug, created_at);

-- Likes: the composite primary key is the one-like-per-user-per-post constraint.
create table public.likes (
  slug text not null,
  user_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (slug, user_id)
);

alter table public.profiles enable row level security;
alter table public.comments enable row level security;
alter table public.likes    enable row level security;

create policy "profiles are public" on public.profiles for select using (true);
create policy "comments are public" on public.comments for select using (true);
create policy "likes are public"    on public.likes    for select using (true);

create policy "users insert own comments" on public.comments
  for insert to authenticated with check (auth.uid() = user_id);
create policy "users delete own comments" on public.comments
  for delete to authenticated using (auth.uid() = user_id);

create policy "users insert own likes" on public.likes
  for insert to authenticated with check (auth.uid() = user_id);
create policy "users delete own likes" on public.likes
  for delete to authenticated using (auth.uid() = user_id);

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
