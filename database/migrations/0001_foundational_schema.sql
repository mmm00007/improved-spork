-- Foundational schema for baseline architecture

create extension if not exists pgcrypto;

create table if not exists public.exercises (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  name text not null,
  primary_muscle_group text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.equipment_variants (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  exercise_id uuid not null references public.exercises(id) on delete cascade,
  name text not null,
  load_unit text not null check (load_unit in ('kg', 'lb')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.session_groups (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  title text,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.sets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  exercise_id uuid not null references public.exercises(id) on delete cascade,
  equipment_variant_id uuid references public.equipment_variants(id) on delete set null,
  session_group_id uuid not null references public.session_groups(id) on delete cascade,
  reps integer not null check (reps > 0),
  load numeric(8,2) not null check (load >= 0),
  rpe numeric(3,1),
  completed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_preferences (
  user_id uuid primary key,
  default_weight_unit text not null default 'kg' check (default_weight_unit in ('kg', 'lb')),
  locale text not null default 'en-US',
  theme text not null default 'system' check (theme in ('light', 'dark', 'system')),
  week_starts_on smallint not null default 1 check (week_starts_on in (0, 1)),
  updated_at timestamptz not null default now()
);

alter table public.exercises enable row level security;
alter table public.equipment_variants enable row level security;
alter table public.session_groups enable row level security;
alter table public.sets enable row level security;
alter table public.user_preferences enable row level security;

create policy if not exists "exercises_owner_only"
  on public.exercises for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy if not exists "equipment_variants_owner_only"
  on public.equipment_variants for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy if not exists "session_groups_owner_only"
  on public.session_groups for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy if not exists "sets_owner_only"
  on public.sets for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy if not exists "user_preferences_owner_only"
  on public.user_preferences for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
