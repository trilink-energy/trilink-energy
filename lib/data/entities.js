export const DATA_ENTITIES = {
  customers: 'customers',
  suppliers: 'suppliers',
  trade_orders: 'trade_orders',
  shipments: 'shipments',
  energy_projects: 'energy_projects',
  invoices: 'invoices',
  payments: 'payments',
  financial_transactions: 'financial_transactions',
  approvals: 'approvals',
  ai_agents: 'ai_agents',
  ai_tasks: 'ai_tasks',
  ai_actions: 'ai_actions',
  ai_approvals: 'ai_approvals',
  risk_alerts: 'risk_alerts',
  audit_logs: 'audit_logs'
}

export function isDataEntity(value) {
  return Object.values(DATA_ENTITIES).includes(value)
}

export function getDataEntities() {
  return Object.values(DATA_ENTITIES)
}
