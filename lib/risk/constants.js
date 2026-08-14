export const RISK_LEVELS = [
  'low',
  'medium',
  'high',
  'critical'
]

export const RISK_STATUSES = [
  'open',
  'investigating',
  'mitigated',
  'accepted',
  'closed'
]

export const AUDIT_EVENT_TYPES = [
  'authentication',
  'authorization',
  'data_access',
  'data_change',
  'financial',
  'ai_action',
  'configuration',
  'security',
  'system'
]

export function validRiskLevel(value) {
  return RISK_LEVELS.includes(value)
}

export function validRiskStatus(value) {
  return RISK_STATUSES.includes(value)
}

export function validAuditEventType(value) {
  return AUDIT_EVENT_TYPES.includes(value)
}
