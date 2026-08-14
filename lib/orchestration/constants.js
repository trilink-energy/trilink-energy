export const WORKFLOW_STATUS = [
  'pending',
  'running',
  'completed',
  'failed',
  'cancelled'
]

export const WORKFLOW_TYPES = [
  'customer_onboarding',
  'supplier_onboarding',
  'trade_order',
  'shipment',
  'energy_project',
  'invoice',
  'payment',
  'approval',
  'ai_task',
  'risk_review'
]

export function validWorkflowStatus(value) {
  return WORKFLOW_STATUS.includes(value)
}

export function validWorkflowType(value) {
  return WORKFLOW_TYPES.includes(value)
}
