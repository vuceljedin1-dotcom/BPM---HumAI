-- Extensions
create extension if not exists pgcrypto; -- for gen_random_uuid
-- ENUM‑like checks
create domain plan_status as text
check (value in
('proposed','approved','active','archived','rejected'));
create domain severity_level as text
check (value in ('info','warn','critical'));
-- USERS
create table if not exists users (
id uuid primary key default gen_random_uuid(),
full_name text not null,
email text unique not null,
phone text,
date_of_birth date,
gender text,
blood_type text,
occupation text,
address text,
emergency_contact text,
created_at timestamptz not null default now(),
updated_at timestamptz not null default now(),
age int generated always as (date_part('year', age(current_date,
date_of_birth))) stored
);
create index if not exists idx_users_email on users(email);
-- MEDICAL HISTORY (1‑N)
create table if not exists medical_history (
id uuid primary key default gen_random_uuid(),
user_id uuid not null references users(id) on delete cascade,
5
note text not null,
created_at timestamptz not null default now()
);
create index if not exists idx_mh_user on medical_history(user_id);
-- PROFILES (baseline + self‑assessments)
create table if not exists profiles (
id uuid primary key default gen_random_uuid(),
user_id uuid not null references users(id) on delete cascade,
height_cm numeric,
weight_kg numeric,
bmi numeric,
waist_cm numeric,
hips_cm numeric,
chest_cm numeric,
upper_arm_cm numeric,
thigh_cm numeric,
body_fat_pct numeric,
mobility_score smallint,
stress_score smallint,
motivation_score smallint,
sleep_hours numeric,
sitting_hours numeric,
walking_km numeric,
created_at timestamptz not null default now(),
updated_at timestamptz not null default now()
);
create index if not exists idx_profiles_user on profiles(user_id);
-- CONSENTS
create table if not exists consents (
id uuid primary key default gen_random_uuid(),
user_id uuid not null references users(id) on delete cascade,
kind text not null, -- communication | media | gdpr |
liability | rules
version text not null,
accepted boolean not null default false,
accepted_at timestamptz,
created_at timestamptz not null default now(),
constraint consents_once_per_kind unique (user_id, kind, version)
);
create index if not exists idx_consents_user on consents(user_id);
-- DEVICES
create table if not exists devices (
id uuid primary key default gen_random_uuid(),
user_id uuid not null references users(id) on delete cascade,
6
device_type text not null, -- whoop | garmin | apple |
shimmer_emg | shimmer_ecg | imu
manufacturer text,
model text,
serial text,
firmware_version text,
calibration_date date,
capabilities jsonb,
created_at timestamptz not null default now()
);
create index if not exists idx_devices_user on devices(user_id);
create unique index if not exists uidx_device_serial on
devices(serial) where serial is not null;
-- PLANS
create table if not exists plans (
id uuid primary key default gen_random_uuid(),
user_id uuid not null references users(id) on delete cascade,
plan_type text not null, -- training | nutrition | combined
status plan_status not null default 'proposed',
starts_on date,
ends_on date,
provenance jsonb, --
{"hyperstackJobId":"...","modelAlias":"...","promptHash":"..."}
mentor_id uuid,
notes text,
created_at timestamptz not null default now(),
updated_at timestamptz not null default now()
);
create index if not exists idx_plans_user on plans(user_id);
-- PLAN VERSIONS
create table if not exists plan_versions (
id uuid primary key default gen_random_uuid(),
plan_id uuid not null references plans(id) on delete cascade,
version int not null,
content jsonb not null,
created_at timestamptz not null default now(),
constraint uidx_plan_versions unique (plan_id, version)
);
-- SESSIONS
create table if not exists sessions (
id uuid primary key default gen_random_uuid(),
user_id uuid not null references users(id) on delete cascade,
plan_id uuid references plans(id) on delete set null,
started_at timestamptz not null,
duration_min int,
7
session_type text,
-- run | strength | mobility | mixed | test
rpe numeric,
inputs jsonb,
outputs jsonb,
anomalies jsonb,
notes text,
created_at timestamptz not null default now()
);
create index if not exists idx_sessions_user on sessions(user_id);
create index if not exists idx_sessions_plan on sessions(plan_id);
create index if not exists idx_sessions_started_at on
sessions(started_at);
-- SESSION METRICS (time‑series)
create table if not exists session_metrics (
id uuid primary key default gen_random_uuid(),
session_id uuid not null references sessions(id) on delete cascade,
metric text not null, -- hrv | hrr | hr_peak | emg_fi |
pace | power | sleep_quality | pain
unit text,
value numeric not null,
recorded_at timestamptz not null,
quality_flag text -- ok | suspect | bad
);
create index if not exists idx_metrics_session on
session_metrics(session_id);
create index if not exists idx_metrics_time on
session_metrics(recorded_at);
create index if not exists idx_metrics_metric on
session_metrics(metric);
-- FLAGS (risk/anomaly)
create table if not exists flags (
id uuid primary key default gen_random_uuid(),
user_id uuid not null references users(id) on delete cascade,
session_id uuid references sessions(id) on delete set null,
kind text not null,
severity severity_level not null,
message text,
created_at timestamptz not null default now(),
cleared_at timestamptz
);
create index if not exists idx_flags_user on flags(user_id);
-- APPROVALS (human‑in‑the‑loop)
create table if not exists approvals (
8
id uuid primary key default gen_random_uuid(),
plan_id uuid not null references plans(id) on delete cascade,
approver_id uuid,
status text not null, -- pending | approved | rejected
decided_at timestamptz,
comment text,
created_at timestamptz not null default now()
);
create index if not exists idx_approvals_plan on approvals(plan_id);
-- AI LOGS (provenance & audit)
create table if not exists ai_logs (
id uuid primary key default gen_random_uuid(),
user_id uuid references users(id) on delete set null,
provider text not null, -- hyperstack | openai
model_alias text,
prompt_hash text,
request jsonb,
response jsonb,
latency_ms int,
idempotency_key text,
created_at timestamptz not null default now(),
constraint uidx_ai_idem unique (idempotency_key)
);
create index if not exists idx_ailogs_user on ai_logs(user_id);
-- (Optional) Row‑Level Security template
-- alter table users enable row level security;
-- create policy user_is_self on users for select using (id =
current_setting('app.user_id')::uuid);

