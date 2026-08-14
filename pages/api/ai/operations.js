import { getCEOIdentity } from '../../../lib/ceo/auth'
import { hasCEOPermission } from '../../../lib/ceo/security'
import {
  validAgentStatus,
  validTaskStatus,
  validActionStatus
} from '../../../lib/ai/constants'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  const identity = getCEOIdentity(req)

  if (!identity) {
    return res.status(401).json({
      ok: false,
      error: 'CEO_AUTHENTICATION_REQUIRED'
    })
  }

  if (!hasCEOPermission(identity, 'ceo.ai.control')) {
    return res.status(403).json({
      ok: false,
      error: 'CEO_PERMISSION_REQUIRED'
    })
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      ok: true,
      agents: [],
      tasks: [],
      actions: []
    })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      error: 'METHOD_NOT_ALLOWED'
    })
  }

  const body = req.body || {}
  const resource = body.resource || 'task'

  if (!['agent', 'task', 'action'].includes(resource)) {
    return res.status(400).json({
      ok: false,
      error: 'INVALID_AI_RESOURCE'
    })
  }

  if (
    resource === 'agent' &&
    body.status &&
    !validAgentStatus(body.status)
  ) {
    return res.status(400).json({
      ok: false,
      error: 'INVALID_AGENT_STATUS'
    })
  }

  if (
    resource === 'task' &&
    body.status &&
    !validTaskStatus(body.status)
  ) {
    return res.status(400).json({
      ok: false,
      error: 'INVALID_TASK_STATUS'
    })
  }

  if (
    resource === 'action' &&
    body.status &&
    !validActionStatus(body.status)
  ) {
    return res.status(400).json({
      ok: false,
      error: 'INVALID_ACTION_STATUS'
    })
  }

  return res.status(201).json({
    ok: true,
    resource,
    id: `ai-${resource}-${Date.now()}`,
    status: body.status || (
      resource === 'agent'
        ? 'draft'
        : resource === 'task'
          ? 'queued'
          : 'proposed'
    ),
    created_at: new Date().toISOString()
  })
}
