-- ============================================================
-- TriLink Security — Authentication Rate Limits
-- ============================================================
-- LOCAL MIGRATION ONLY
-- DO NOT PUSH UNTIL FINAL DATABASE REVIEW
-- ============================================================

create table if not exists public.auth_rate_limits (
  id uuid primary key default gen_random_uuid(),

  scope text not null,
  identifier_hash text not null,

  attempts integer not null default 0,
  window_start timestamptz not null default now(),
  blocked_until timestamptz null,

  last_attempt_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint auth_rate_limits_scope_check
    check (length(scope) > 0),

  constraint auth_rate_limits_attempts_check
    check (attempts >= 0),

  unique (scope, identifier_hash)
);

create index if not exists auth_rate_limits_scope_idx
  on public.auth_rate_limits(scope);

create index if not exists auth_rate_limits_blocked_until_idx
  on public.auth_rate_limits(blocked_until);

alter table public.auth_rate_limits enable row level security;

comment on table public.auth_rate_limits is
  'Server-side authentication rate limiting records.';

comment on column public.auth_rate_limits.identifier_hash is
  'Hashed request identifier. Raw IP addresses must not be stored.';
