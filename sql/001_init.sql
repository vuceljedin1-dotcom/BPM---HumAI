-- profili korisnika
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  full_name text,
  created_at timestamp with time zone default now()
);

-- onboarding unos
create table if not exists onboarding (
  user_id uuid primary key references auth.users(id) on delete cascade,
  goal text,
  experience_level text,
  consent boolean default false,
  created_at timestamp with time zone default now()
);

-- prvi process run
create table if not exists process_runs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  status text default 'created', -- created|running|done|error
  model_alias text,
  input_json jsonb,
  output_json jsonb,
  created_at timestamp with time zone default now(),
  finished_at timestamp with time zone
);

