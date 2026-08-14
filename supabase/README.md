# TriLink Global — Supabase Database

This directory contains the production PostgreSQL/Supabase
migration structure.

Migration:

001_trilink_core.sql

The migration creates the foundation for:

- CEO identity
- roles
- permissions
- AI agents
- AI tasks
- AI actions
- AI approvals
- customers
- suppliers
- trade
- quotations
- orders
- logistics
- shipments
- energy
- invoices
- payments
- finance
- risk
- compliance
- approvals
- audit logs
- system events

## Security rule

Never commit production credentials.

Do not place the following in this repository:

- Supabase service-role key
- database password
- Stripe secret
- NEXTAUTH secret
- CEO password
- private API keys
