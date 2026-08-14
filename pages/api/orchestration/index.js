import { getCEOIdentity } from '../../../lib/ceo/auth'
import { hasCEOPermission } from '../../../lib/ceo/security'
import { WORKFLOW_STATUS, WORKFLOW_TYPES } from '../../../lib/orchestration/constants'

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  const identity = getCEOIdentity(req)

  if (!identity) {
    return res.status(401).json({
      ok: false,
      error: 'CEO_AUTHENTICATION_REQUIRED'
    })
  }

  if (!hasCEOPermission(identity, 'ceo.dashboard.view')) {
    return res.status(403).json({
      ok: false,
      error: 'CEO_PERMISSION_REQUIRED'
    })
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      ok: false,
      error: 'METHOD_NOT_ALLOWED'
    })
  }

  return res.status(200).json({
    ok: true,
    orchestration: 'ready',
    workflow_types: WORKFLOW_TYPES,
    statuses: WORKFLOW_STATUS,
    generated_at: new Date().toISOString()
  })
}
