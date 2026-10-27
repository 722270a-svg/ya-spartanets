-- Apply in the PRIVATE Supabase project, not in the public browser.
create table if not exists public.recruit_applications(
 id uuid primary key default gen_random_uuid(),
 created_at timestamptz not null default now(),
 full_name text not null check (length(trim(full_name)) between 3 and 150),
 phone text not null check(length(phone) between 7 and 32),
 vk_account text,
 telegram_account text,
 height_cm numeric(5,1),
 weight_kg numeric(5,1),
 sports_history text,
 american_football_experience text not null check(american_football_experience in ('yes','no')),
 flag_football_experience text not null check(flag_football_experience in ('yes','no')),
 status text not null default 'new' check(status in ('new','reviewed'))
);
alter table public.recruit_applications enable row level security;
revoke all on public.recruit_applications from anon,authenticated;
grant insert on public.recruit_applications to anon;
grant select on public.recruit_applications to authenticated;
drop policy if exists "public can submit applications" on public.recruit_applications;
create policy "public can submit applications" on public.recruit_applications for insert to anon with check (status='new');
drop policy if exists "only authorized club admin can read applications" on public.recruit_applications;
create policy "only authorized club admin can read applications" on public.recruit_applications for select to authenticated using(
 exists(select 1 from public.club_profiles p where p.id=(select auth.uid()) and p.role='admin')
);
-- IMPORTANT: enable CAPTCHA / rate limits via an API gateway before broad public launch.
-- Private applicant data is never placed in public repo or static JSON.
