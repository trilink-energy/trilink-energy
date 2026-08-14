import { createRepository } from './base'

export const customerRepository =
  createRepository('customers')

export const supplierRepository =
  createRepository('suppliers')

export const tradeRepository =
  createRepository('trade_orders')

export const logisticsRepository =
  createRepository('shipments')

export const energyRepository =
  createRepository('energy_projects')

export const invoiceRepository =
  createRepository('invoices')

export const paymentRepository =
  createRepository('payments')

export const approvalRepository =
  createRepository('approvals')

export const aiTaskRepository =
  createRepository('ai_tasks')

export const riskRepository =
  createRepository('risk_alerts')

export const auditRepository =
  createRepository('audit_logs')
