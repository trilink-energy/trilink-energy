import { getCEOIdentity } from '../../../lib/ceo/auth'
import { hasCEOPermission } from '../../../lib/ceo/security'
import {
  validRiskLevel,
  validRiskStatus,
  validAuditEventType
} from '../../../lib/risk/constants'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  const identity = getCEOIdentity(req)

  if (!identity) {
    return res.status(401).json({
      ok: false,
      error: 'CEO_AUTHENTICATION_REQUIRED'
    })
  }

  if (
    !hasCEOPermission(identity, 'ceo.risk.view') &&
    !hasCEOPermission(identity, 'ceo.audit.view')
  ) {
    return res.status(403).json({
      ok: false,
      error: 'CEO_PERMISSION_REQUIRED'
    })
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      ok: true,
      risks: [],
      audit_events: []
    })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      error: 'METHOD_NOT_ALLOWED'
    })
  }

  const body = req.body || {}

  if (body.resource === 'risk') {
    if (body.level && !validRiskLevel(body.level)) {
      return res.status(400).json({
        ok: false,
        error: 'INVALID_RISK_LEVEL'
      })
    }

    if (body.status && !validRiskStatus(body.status)) {
      return res.status(400).json({
        ok: false,
        error: 'INVALID_RISK_STATUS'
      })
    }
  }

  if (body.resource === 'audit') {
    if (
      body.event_type &&
      !validAuditEventType(body.event_type)
    ) {
      return res.status(400).json({
        ok: false,
        error: 'INVALID_AUDIT_EVENT_TYPE'
      })
    }
  }

  return res.status(201).json({
    ok: true,
    resource: body.resource || 'risk',
    id: `risk-${Date.now()}`,
    created_at: new Date().toISOString()
  })
}
