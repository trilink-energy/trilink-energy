-- ============================================================
-- TRILINK GLOBAL
-- CORE PRODUCTION DATABASE SCHEMA
-- PART 5
-- ============================================================
--
-- PostgreSQL / Supabase compatible
--
-- CORE PRINCIPLE:
-- CEO authority > AI permissions
-- Every material AI action must be auditable.
-- ============================================================

create extension if not exists pgcrypto;

-- ============================================================
-- USERS / ROLES / PERMISSIONS
-- ============================================================

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  full_name text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists roles (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists permissions (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  description text,
  risk_level text not null default 'low',
  created_at timestamptz not null default now()
);

create table if not exists user_roles (
  user_id uuid not null references users(id) on delete cascade,
  role_id uuid not null references roles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, role_id)
);

create table if not exists user_permissions (
  user_id uuid not null references users(id) on delete cascade,
  permission_id uuid not null references permissions(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, permission_id)
);

-- ============================================================
-- AI AGENTS
-- ============================================================

create table if not exists ai_agents (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  description text,
  status text not null default 'inactive',
  permission_level text not null default 'restricted',
  enabled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists ai_tasks (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid references ai_agents(id),
  task_type text not null,
  status text not null default 'queued',
  priority integer not null default 50,
  input_data jsonb,
  output_data jsonb,
  error_message text,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists ai_actions (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid references ai_agents(id),
  task_id uuid references ai_tasks(id),
  action_type text not null,
  permission_required text,
  risk_level text not null default 'low',
  status text not null default 'pending',
  input_data jsonb,
  output_data jsonb,
  approval_required boolean not null default false,
  approved_by uuid references users(id),
  executed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists ai_approvals (
  id uuid primary key default gen_random_uuid(),
  action_id uuid not null references ai_actions(id) on delete cascade,
  status text not null default 'pending',
  requested_by uuid references users(id),
  reviewed_by uuid references users(id),
  reason text,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

-- ============================================================
-- CUSTOMERS / SUPPLIERS
-- ============================================================

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  contact_name text,
  email text,
  phone text,
  country text,
  status text not null default 'active',
  risk_level text not null default 'standard',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists suppliers (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  contact_name text,
  email text,
  phone text,
  country text,
  status text not null default 'active',
  risk_level text not null default 'standard',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- TRADE
-- ============================================================

create table if not exists trade_opportunities (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id),
  supplier_id uuid references suppliers(id),
  title text not null,
  origin_country text,
  destination_country text,
  product_category text,
  estimated_value numeric(18,2),
  currency text default 'USD',
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists quotations (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid references trade_opportunities(id),
  customer_id uuid references customers(id),
  quotation_number text unique,
  amount numeric(18,2),
  currency text default 'USD',
  status text not null default 'draft',
  valid_until date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id),
  supplier_id uuid references suppliers(id),
  quotation_id uuid references quotations(id),
  order_number text unique,
  status text not null default 'draft',
  total_amount numeric(18,2),
  currency text default 'USD',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_name text not null,
  description text,
  quantity numeric(18,4) not null default 1,
  unit_price numeric(18,4),
  total_price numeric(18,2),
  created_at timestamptz not null default now()
);

-- ============================================================
-- LOGISTICS
-- ============================================================

create table if not exists shipments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id),
  shipment_number text unique,
  origin_country text,
  destination_country text,
  carrier text,
  tracking_reference text,
  status text not null default 'planned',
  estimated_departure timestamptz,
  estimated_arrival timestamptz,
  actual_departure timestamptz,
  actual_arrival timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists shipment_events (
  id uuid primary key default gen_random_uuid(),
  shipment_id uuid not null references shipments(id) on delete cascade,
  event_type text not null,
  location text,
  event_time timestamptz not null default now(),
  description text,
  created_at timestamptz not null default now()
);

-- ============================================================
-- ENERGY
-- ============================================================

create table if not exists energy_projects (
  id uuid primary key default gen_random_uuid(),
  project_name text not null,
  country text,
  project_type text,
  capacity numeric(18,4),
  capacity_unit text,
  estimated_value numeric(18,2),
  currency text default 'USD',
  status text not null default 'planning',
  risk_level text not null default 'standard',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- FINANCE
-- ============================================================

create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id),
  order_id uuid references orders(id),
  invoice_number text unique,
  amount numeric(18,2) not null,
  currency text default 'USD',
  status text not null default 'draft',
  issued_at timestamptz,
  due_at timestamptz,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid references invoices(id),
  amount numeric(18,2) not null,
  currency text default 'USD',
  payment_provider text,
  provider_reference text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists financial_transactions (
  id uuid primary key default gen_random_uuid(),
  transaction_type text not null,
  reference_type text,
  reference_id uuid,
  amount numeric(18,2),
  currency text default 'USD',
  status text not null default 'pending',
  description text,
  created_at timestamptz not null default now()
);

-- ============================================================
-- RISK / COMPLIANCE
-- ============================================================

create table if not exists risks (
  id uuid primary key default gen_random_uuid(),
  resource_type text not null,
  resource_id uuid,
  risk_level text not null,
  title text not null,
  description text,
  status text not null default 'open',
  owner_id uuid references users(id),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table if not exists compliance_records (
  id uuid primary key default gen_random_uuid(),
  resource_type text not null,
  resource_id uuid,
  compliance_type text not null,
  status text not null default 'pending',
  notes text,
  reviewed_by uuid references users(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

-- ============================================================
-- APPROVALS
-- ============================================================

create table if not exists approvals (
  id uuid primary key default gen_random_uuid(),
  resource_type text not null,
  resource_id uuid,
  approval_type text not null,
  status text not null default 'pending',
  requested_by uuid references users(id),
  approved_by uuid references users(id),
  reason text,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

-- ============================================================
-- AUDIT
-- ============================================================

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_type text not null,
  actor_id uuid,
  action text not null,
  resource_type text,
  resource_id uuid,
  permission text,
  risk_level text,
  result text not null,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create table if not exists system_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  severity text not null default 'info',
  source text,
  message text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

-- ============================================================
-- INDEXES
-- ============================================================

create index if not exists idx_ai_tasks_status
  on ai_tasks(status);

create index if not exists idx_ai_actions_status
  on ai_actions(status);

create index if not exists idx_ai_approvals_status
  on ai_approvals(status);

create index if not exists idx_orders_status
  on orders(status);

create index if not exists idx_shipments_status
  on shipments(status);

create index if not exists idx_invoices_status
  on invoices(status);

create index if not exists idx_payments_status
  on payments(status);

create index if not exists idx_risks_status
  on risks(status);

create index if not exists idx_approvals_status
  on approvals(status);

create index if not exists idx_audit_logs_created_at
  on audit_logs(created_at desc);

create index if not exists idx_system_events_created_at
  on system_events(created_at desc);

-- ============================================================
-- INITIAL ROLES
-- ============================================================

insert into roles (name, description)
values
  (
    'FOUNDER_CHAIRMAN_CEO',
    'Ultimate executive authority over TriLink Global.'
  ),
  (
    'EXECUTIVE',
    'Senior executive operational role.'
  ),
  (
    'MANAGER',
    'Operational management role.'
  ),
  (
    'OPERATOR',
    'Approved day-to-day operational role.'
  ),
  (
    'AI_AGENT',
    'Machine identity operating under explicit permissions.'
  )
on conflict (name) do nothing;

-- ============================================================
-- INITIAL AI PERMISSION LEVELS
-- ============================================================

insert into permissions (name, description, risk_level)
values
  (
    'AI_READ',
    'Read approved business information.',
    'low'
  ),
  (
    'AI_ANALYSE',
    'Analyse approved business information.',
    'low'
  ),
  (
    'AI_DRAFT',
    'Prepare drafts requiring human review where appropriate.',
    'medium'
  ),
  (
    'AI_OPERATIONAL',
    'Execute approved low-risk operational workflows.',
    'medium'
  ),
  (
    'AI_FINANCIAL',
    'Financial actions requiring explicit authority.',
    'high'
  ),
  (
    'AI_LEGAL',
    'Legal or regulatory actions requiring CEO authority.',
    'critical'
  ),
  (
    'CEO_OVERRIDE',
    'Founder / Chairman / CEO override authority.',
    'critical'
  )
on conflict (name) do nothing;

-- ============================================================
-- SCHEMA VERSION
-- ============================================================

create table if not exists system_schema_versions (
  version text primary key,
  description text not null,
  applied_at timestamptz not null default now()
);

insert into system_schema_versions (
  version,
  description
)
values (
  '001',
  'TriLink Global core business, AI, finance, logistics, energy, risk and audit schema.'
)
on conflict (version) do nothing;

-- ============================================================
-- END PART 5
-- ============================================================
