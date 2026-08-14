# TriLink Database Foundation

The production database is the central data layer for the TriLink
CEO Dashboard and AI operating system.

Core areas:

- CEO identity and permissions
- AI agents
- AI tasks
- AI actions
- AI approvals
- Customers
- Suppliers
- Trade
- Orders
- Logistics
- Energy
- Finance
- Payments
- Risk
- Compliance
- Audit
- System events

## Security

Database credentials must only be supplied through server-side
environment variables.

Never commit:

- database passwords
- service-role keys
- private API keys
- payment secrets
- authentication secrets

## Planned production provider

The master plan permits Supabase as the database layer.

The application must not assume the database is live until the
connection has been configured and tested.
