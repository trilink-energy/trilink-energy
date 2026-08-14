import { getCEOIdentity } from '../../../lib/ceo/auth'
import { hasCEOPermission } from '../../../lib/ceo/security'
import {
  validApprovalType,
  validApprovalPriority,
  validApprovalReference
} from '../../../lib/approvals/validation'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  const identity = getCEOIdentity(req)

  if (!identity) {
    return res.status(401).json({
      ok: false,
      error: 'CEO_AUTHENTICATION_REQUIRED'
    })
  }

  const permission =
    req.method === 'GET'
      ? 'ceo.approvals.view'
      : 'ceo.approvals.execute'

  if (!hasCEOPermission(identity, permission)) {
    return res.status(403).json({
      ok: false,
      error: 'CEO_PERMISSION_REQUIRED'
    })
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      ok: true,
      requests: []
    })
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['GET', 'POST'])

    return res.status(405).json({
      ok: false,
      error: 'METHOD_NOT_ALLOWED'
    })
  }

  const body = req.body || {}

  if (!validApprovalReference(body.reference)) {
    return res.status(400).json({
      ok: false,
      error: 'INVALID_APPROVAL_REFERENCE'
    })
  }

  if (!validApprovalType(body.type)) {
    return res.status(400).json({
      ok: false,
      error: 'INVALID_APPROVAL_TYPE'
    })
  }

  if (
    body.priority &&
    !validApprovalPriority(body.priority)
  ) {
    return res.status(400).json({
      ok: false,
      error: 'INVALID_APPROVAL_PRIORITY'
    })
  }

  return res.status(201).json({
    ok: true,
    approval: {
      reference: body.reference.trim(),
      type: body.type,
      priority: body.priority || 'normal',
      status: 'pending',
      requested_by: identity.role
    }
  })
}
