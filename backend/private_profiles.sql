-- Private Spartans player/coach profiles. Apply to a private Supabase PostgreSQL project.
-- NEVER place roster exports, passwords or service role keys in GitHub Pages.
create extension if not exists pgcrypto;
create table if not exists public.club_profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 role text not null default 'player' check(role in ('player','coach','admin')),
 full_name text not null,
 position text,
 jersey_number text,
 birth_date date,
 height_cm numeric(5,1),
 weight_kg numeric(5,1),
 jersey_size text,
 breeches_size text,
 tshirt_size text,
 shorts_size text,
 photo_url text,
 medical_exam_complete boolean not null default false,
 rusada_complete boolean not null default false,
 data_processing_consent boolean not null default false,
 insurance_complete boolean not null default false,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create index if not exists club_profiles_role_idx on public.club_profiles(role);
alter table public.club_profiles enable row level security;
revoke all on public.club_profiles from anon;
revoke all on public.club_profiles from authenticated;
grant select on public.club_profiles to authenticated;
-- Each user only sees own row. Admin access is mediated by trusted server/service,
-- never a client-set role or by unprotected UPDATE permissions.
drop policy if exists "read own club profile" on public.club_profiles;
create policy "read own club profile" on public.club_profiles
 for select to authenticated using (id = (select auth.uid()));
-- No client INSERT/UPDATE/DELETE policies or grants: personal fields/status are
-- managed only via server-side admin APIs after verifying operator permissions.
-- Provision invitations and assign roles through a trusted admin server.
comment on table public.club_profiles is 'Private player/coach data; no public roster or open file export.';
