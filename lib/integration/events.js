export const SYSTEM_EVENTS = [
  'customer.created',
  'customer.updated',
  'supplier.created',
  'supplier.updated',
  'trade.created',
  'trade.updated',
  'shipment.created',
  'shipment.updated',
  'energy.project.created',
  'energy.project.updated',
  'invoice.created',
  'payment.created',
  'approval.created',
  'approval.approved',
  'approval.rejected',
  'ai.task.created',
  'ai.action.created',
  'risk.alert.created',
  'audit.event.created',
  'settings.updated'
]

export function isSystemEvent(value) {
  return SYSTEM_EVENTS.includes(value)
}
