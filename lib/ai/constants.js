export const AI_AGENT_STATUSES = [
  'draft',
  'active',
  'paused',
  'disabled'
]

export const AI_TASK_STATUSES = [
  'queued',
  'running',
  'waiting_approval',
  'completed',
  'failed',
  'cancelled'
]

export const AI_ACTION_STATUSES = [
  'proposed',
  'pending_approval',
  'approved',
  'executing',
  'completed',
  'rejected',
  'failed'
]

export const AI_PERMISSIONS = [
  'ceo.ai.view',
  'ceo.ai.control',
  'ceo.ai.permissions'
]

export function validAgentStatus(value) {
  return AI_AGENT_STATUSES.includes(value)
}

export function validTaskStatus(value) {
  return AI_TASK_STATUSES.includes(value)
}

export function validActionStatus(value) {
  return AI_ACTION_STATUSES.includes(value)
}
