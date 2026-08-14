-- TriLink Global
-- Canonical authentication schema
-- Customer authentication, password reset foundation,
-- and authentication audit events.

alter table users
  add column if not exists username text;

alter table users
  add column if not exists password_hash text;

alter table users
  add column if not exists must_change_password boolean
  not null default false;

alter table users
  add column if not exists first_login boolean
  not null default true;

alter table users
  add column if not exists password_changed_at timestamptz;

alter table users
  add column if not exists last_login_at timestamptz;

create unique index if not exists idx_users_username
  on users(username)
  where username is not null;

create unique index if not exists idx_users_email
  on users(email);

create table if not exists password_reset_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  token_hash text unique not null,
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_password_reset_tokens_user
  on password_reset_tokens(user_id);

create index if not exists idx_password_reset_tokens_expires
  on password_reset_tokens(expires_at);

create table if not exists authentication_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete set null,
  event_type text not null,
  ip_address text,
  user_agent text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_authentication_events_user
  on authentication_events(user_id);

create index if not exists idx_authentication_events_created
  on authentication_events(created_at desc);

comment on column users.password_hash is
  'SHA-256 password hash used by the current TriLink application authentication layer.';

comment on column users.first_login is
  'True until the customer completes the required first-login password change.';

comment on column users.must_change_password is
  'Forces the customer to change their password before normal account use.';

comment on column users.password_changed_at is
  'Timestamp of the most recent customer password change.';

comment on column users.last_login_at is
  'Timestamp of the most recent successful customer login.';
