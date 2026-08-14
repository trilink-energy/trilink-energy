import {
  CORE_TABLES,
  DATABASE_MODULES
} from './constants'

export function getDatabaseConsistencyReport() {
  const tableModules = {
    customers: ['customers'],
    suppliers: ['suppliers'],
    trade: ['trade'],
    logistics: ['logistics'],
    energy: ['energy_projects'],
    finance: [
      'invoices',
      'payments',
      'financial_transactions'
    ],
    approvals: ['approvals'],
    ai: [
      'ai_agents',
      'ai_tasks',
      'ai_actions',
      'ai_approvals'
    ],
    risk: [],
    audit: []
  }

  const modules = DATABASE_MODULES.map(module => ({
    module,
    tables: tableModules[module] || []
  }))

  return {
    modules,
    core_tables: CORE_TABLES,
    module_count: modules.length,
    table_count: CORE_TABLES.length
  }
}
