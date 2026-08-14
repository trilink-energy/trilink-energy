export const DATABASE_MODULES = [
  'customers',
  'suppliers',
  'trade',
  'logistics',
  'energy',
  'finance',
  'approvals',
  'ai',
  'risk',
  'audit'
]

export const CORE_TABLES = [
  'customers',
  'suppliers',
  'trade',
  'shipments',
  'energy_projects',
  'invoices',
  'payments',
  'financial_transactions',
  'approvals',
  'ai_agents',
  'ai_tasks',
  'ai_actions',
  'ai_approvals'
]

export function isDatabaseModule(value) {
  return DATABASE_MODULES.includes(value)
}

export function isCoreTable(value) {
  return CORE_TABLES.includes(value)
}
