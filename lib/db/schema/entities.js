/**
 * TriLink Core Data Model
 *
 * This file documents the canonical business entities.
 *
 * The actual production database migration will be created
 * once the database connection is configured.
 */

export const TABLES = {
  USERS: 'users',
  ROLES: 'roles',
  PERMISSIONS: 'permissions',
  USER_PERMISSIONS: 'user_permissions',

  AI_AGENTS: 'ai_agents',
  AI_TASKS: 'ai_tasks',
  AI_ACTIONS: 'ai_actions',
  AI_APPROVALS: 'ai_approvals',

  CUSTOMERS: 'customers',
  SUPPLIERS: 'suppliers',

  TRADE_OPPORTUNITIES: 'trade_opportunities',
  QUOTATIONS: 'quotations',
  ORDERS: 'orders',
  ORDER_ITEMS: 'order_items',

  SHIPMENTS: 'shipments',
  SHIPMENT_EVENTS: 'shipment_events',

  ENERGY_PROJECTS: 'energy_projects',

  INVOICES: 'invoices',
  PAYMENTS: 'payments',
  FINANCIAL_TRANSACTIONS: 'financial_transactions',

  APPROVALS: 'approvals',
  RISKS: 'risks',
  COMPLIANCE_RECORDS: 'compliance_records',

  AUDIT_LOGS: 'audit_logs',
  SYSTEM_EVENTS: 'system_events'
}

export const CORE_RELATIONSHIPS = {
  users: [
    'roles',
    'permissions',
    'audit_logs'
  ],

  ai_agents: [
    'ai_tasks',
    'ai_actions',
    'ai_approvals',
    'audit_logs'
  ],

  customers: [
    'trade_opportunities',
    'quotations',
    'orders',
    'invoices'
  ],

  suppliers: [
    'trade_opportunities',
    'orders',
    'shipments'
  ],

  orders: [
    'order_items',
    'shipments',
    'invoices',
    'payments'
  ],

  shipments: [
    'shipment_events'
  ],

  energy_projects: [
    'financial_transactions',
    'risks',
    'compliance_records'
  ]
}
