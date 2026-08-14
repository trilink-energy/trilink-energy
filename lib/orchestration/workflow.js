import crypto from 'crypto'
import {
  validWorkflowType,
  validWorkflowStatus
} from './constants'

export function createWorkflow({
  type,
  actor = 'SYSTEM',
  entity = null,
  entityId = null,
  metadata = {}
}) {
  if (!validWorkflowType(type)) {
    throw new Error('INVALID_WORKFLOW_TYPE')
  }

  return {
    id: crypto.randomUUID(),
    type,
    actor,
    entity,
    entity_id: entityId,
    status: 'pending',
    metadata,
    created_at: new Date().toISOString()
  }
}

export function updateWorkflowStatus(workflow, status) {
  if (!workflow || !validWorkflowStatus(status)) {
    throw new Error('INVALID_WORKFLOW_STATUS')
  }

  return {
    ...workflow,
    status,
    updated_at: new Date().toISOString()
  }
}
