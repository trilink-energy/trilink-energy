import crypto from 'crypto'
import { isSystemEvent } from './events'

export function createSystemEvent({
  type,
  actor = 'SYSTEM',
  entity = null,
  entityId = null,
  data = {}
}) {
  if (!isSystemEvent(type)) {
    throw new Error('INVALID_SYSTEM_EVENT')
  }

  return {
    id: crypto.randomUUID(),
    type,
    actor,
    entity,
    entity_id: entityId,
    data,
    created_at: new Date().toISOString()
  }
}
