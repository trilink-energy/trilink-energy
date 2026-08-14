export const RISK_AUDIT_FLOW = [
  'request',
  'risk_assessment',
  'decision',
  'action',
  'audit_event',
  'review'
]

export function getRiskAuditFlow() {
  return RISK_AUDIT_FLOW
}
