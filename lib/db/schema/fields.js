/**
 * Canonical field definitions.
 *
 * These are implementation requirements for the production
 * database. They are not live database records yet.
 */

export const STANDARD_FIELDS = {
  id: 'uuid',
  created_at: 'timestamp',
  updated_at: 'timestamp',
  created_by: 'uuid',
  updated_by: 'uuid'
}

export const AI_ACTION_FIELDS = {
  id: 'uuid',
  agent_id: 'uuid',
  task_id: 'uuid',
  action_type: 'string',
  permission_required: 'string',
  risk_level: 'string',
  status: 'string',
  input_reference: 'string',
  output_reference: 'string',
  approval_required: 'boolean',
  approved_by: 'uuid',
  executed_at: 'timestamp',
  created_at: 'timestamp'
}

export const AUDIT_FIELDS = {
  id: 'uuid',
  actor_type: 'string',
  actor_id: 'uuid',
  action: 'string',
  resource_type: 'string',
  resource_id: 'uuid',
  permission: 'string',
  risk_level: 'string',
  result: 'string',
  metadata: 'json',
  created_at: 'timestamp'
}
